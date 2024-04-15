# NikeCloneApp

# Overview
This project is a React Native application that serves as a clone of a Nike product catalog and shopping cart system. The app allows users to browse a list of Nike products, view individual product details with a carousel, and add products to a shopping cart. The shopping cart also displays a list of items with options to increase or decrease quantities.

# Features
- Product List: Displays a list of Nike products.
- Product Details: Opens a section sheet with a carousel showcasing product details upon clicking an individual product.
- Add to Cart: Adds selected products to the shopping cart.
- Shopping Cart: Displays a list of added items with options to increase or decrease quantities.
# Preview
![Screenshot_1713161491](https://github.com/Riser17/NikeCloneApp/assets/91198103/cc80f72f-a109-4611-8fae-de9242faa4a4)
![Screenshot_1713161519](https://github.com/Riser17/NikeCloneApp/assets/91198103/14d48fd9-4cc6-45df-b57e-b62880901c8b)
![Screenshot_1713161692](https://github.com/Riser17/NikeCloneApp/assets/91198103/e0949e6b-5721-487c-b1c7-5727c23792fb)


# Project Structure
The project consists of the following components and files:

- CartListItem.js: React Native component to display individual items in the shopping cart.
- store/cartSlice.js: Redux slice containing the cart state and actions.

# CartListItem Component
The CartListItem component renders individual items in the shopping cart. It displays the product image, name, available sizes, quantity, and total price. Users can increase or decrease the quantity of each item in the cart using the plus and minus buttons.

# Dependencies
- React Native
- Redux
- @expo/vector-icons

# Conclusion
This Nike Clone project provides a user-friendly interface for browsing Nike products, viewing details, and managing a shopping cart. With its modular components and Redux state management, the application offers a scalable foundation for further development and enhancements.
