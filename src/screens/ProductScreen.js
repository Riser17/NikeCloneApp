import { useState, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import { useGetProductsQuery } from "../store/apiSlice";
import ProductDetailsScreen from "./ProductDetailsScreen";

const ProductScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const itemIdRef = useRef(null);
  const dispatch = useDispatch();

  // const products = useSelector((state) => state.products.products);
  const { data, isLoading, error } = useGetProductsQuery(); // TODO data,isLoading, error manage automatically

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.error}</Text>;
  }

  const products = data.data;

  const productItemPressed = (item) => {
    itemIdRef.current = item._id;
    // dispatch(productSlice.actions.setSelectedProduct(item.id));
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
        // keyExtractor={(item) => item.id}
        numColumns={2}
      />
      {isVisible ? (
        <ProductDetailsScreen
          show={isVisible}
          onClose={onCloseMediaActionSheet}
          itemId={itemIdRef.current}
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
