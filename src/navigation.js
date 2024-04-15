import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { selectNumberOfItems } from "./store/cartSlice";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{ flexDirection: "row" }}
              >
                <FontAwesome name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: "500" }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="Product Details" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
