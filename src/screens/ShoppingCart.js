import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CartListItem from "../components/CartListItem";
import {
  cartSlice,
  selectDelivaryPrice,
  selectSubtotal,
  selectTotal,
} from "../store/cartSlice";
import { useCreateOrderMutation } from "../store/apiSlice";

const ShoppingCart = () => {
  const subtotal = useSelector(selectSubtotal);
  const delivaryFee = useSelector(selectDelivaryPrice);
  const total = useSelector(selectTotal);

  const dispatch = useDispatch();

  const ShoopingCartTotals = () => {
    return (
      <View style={styles.totalsContainer}>
        <View style={styles.row}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>{subtotal} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Delivery</Text>
          <Text style={styles.text}>{delivaryFee} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Total</Text>
          <Text style={styles.textBold}>{total} US$</Text>
        </View>
      </View>
    );
  };

  const cartItems = useSelector((state) => state.cart.items);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      delivaryFee,
      total,
      customer: {
        name: "Mike",
        address: "My home",
        email: "Mike@example.com",
      },
    });
    if (result.data?.status === "OK") {
      Alert.alert(
        "Order has been submitted",
        `Your order reference is: ${result.data.data.ref}`,
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoopingCartTotals}
      />

      <Pressable style={styles.button} onPress={onCreateOrder}>
        <Text style={styles.buttonText}>
          Checkout
          {isLoading && <ActivityIndicator />}
        </Text>
      </Pressable>
    </>
  );
};
export default ShoppingCart;

const styles = StyleSheet.create({
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
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
