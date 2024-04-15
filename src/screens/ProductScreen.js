import { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { productSlice } from "../store/productSlice";
import ProductDetailsScreen from "./ProductDetailsScreen";

const ProductScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const productItemPressed = (item) => {
    dispatch(productSlice.actions.setSelectedProduct(item.id));
    setIsVisible(!isVisible);
  };
  const onCloseMediaActionSheet = () => {
    setIsVisible(false);
  };

  const productItemConatainer = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => productItemPressed(item)}
        style={styles.itemContainer}
      >
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        data={products}
        renderItem={productItemConatainer}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      {isVisible ? (
        <ProductDetailsScreen
          show={isVisible}
          onClose={onCloseMediaActionSheet}
        />
      ) : null}
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: { width: "100%", aspectRatio: 1 },
});
