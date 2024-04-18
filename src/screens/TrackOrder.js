import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useState } from "react";
import { useGetOrderQuery } from "../store/apiSlice";

const TrackOrder = () => {
  const [ref, setRef] = useState("");

  const { data, isLoading, error } = useGetOrderQuery(ref);

  const ShoopingCartTotals = () => {
    return (
      <View style={styles.totalsContainer}>
        <View style={styles.row}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>{data.data.subtotal} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Total</Text>
          <Text style={styles.textBold}>{data.data.total} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Customer Name</Text>
          <Text style={styles.textBold}>{data.data.customer.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Email</Text>
          <Text style={styles.textBold}>{data.data.customer.email}</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.product.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text>{item.product.name}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <View style={{ marginLeft: "auto" }}>
          <Text style={styles.itemTotal}>${item.product.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Your order reference"
      />
      {isLoading && <ActivityIndicator style={styles.loader} />}
      {data?.status !== "OK" && (
        <Text style={styles.errorText}>Order not found</Text>
      )}
      {data?.status === "OK" && (
        <View style={styles.orderDetails}>
          <Text style={styles.orderText}>Order Details</Text>
          <FlatList
            data={data.data.items}
            renderItem={renderItem}
            keyExtractor={(item) => item.product._id}
            ListFooterComponent={ShoopingCartTotals}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loader: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  orderDetails: {
    marginTop: 20,
  },
  orderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  productImage: {
    width: "40%",
    aspectRatio: 1,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-end",
  },
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
});

export default TrackOrder;
