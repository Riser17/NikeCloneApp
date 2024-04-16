import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import ActionSheet, { ScrollView } from "react-native-actions-sheet";
import { useDispatch } from "react-redux";

import { useGetProductQuery } from "../store/apiSlice";
import { cartSlice } from "../store/cartSlice";

const ProductDetailsScreen = (props) => {
  const { itemId, onClose } = props;
  const { data, isLoading, error } = useGetProductQuery(itemId);
  //const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();

  if (error) {
    return <Text>{error.error}</Text>;
  }

  const product = data?.data;

  useEffect(() => {
    actionSheetRef.current?.show();
  }, []);

  const handleClose = async () => {
    actionSheetRef.current?.hide();
    await onClose();
  };

  const actionSheetRef = useRef(null);
  const { width } = useWindowDimensions();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
      indicatorStyle={{
        width: 100,
      }}
      gestureEnabled={true}
      useBottomSafeAreaPadding={true}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <ScrollView>
            {/* Image Carousel */}
            <FlatList
              data={product.images}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width: width, aspectRatio: 1 }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
            />

            <View style={{ padding: 20 }}>
              {/* Title */}
              <Text style={styles.title}>{product.name}</Text>
              {/* Price */}
              <Text style={styles.price}>$ {product.price}</Text>
              {/* Description */}
              <Text style={styles.description}>{product.description}</Text>
            </View>
            <View style={{ height: 80 }}></View>
          </ScrollView>

          {/* Add to cart button */}
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.9 : 1,
              },
              styles.button,
            ]}
            onPress={addToCart}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </Pressable>

          {/* Navigation icon */}
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
              styles.icon,
            ]}
            onPress={handleClose}
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
        </View>
      )}
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
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
  icon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#000000AA",
    borderRadius: 50,
    padding: 5,
  },
});

export default ProductDetailsScreen;
