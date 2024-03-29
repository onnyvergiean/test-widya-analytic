import ActionTypes from '../ActionType';

const initialState = {
  products: [],
  myProducts: [],
};

const productReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.payload.products || [],
      };
    case ActionTypes.RECEIVE_MY_PRODUCTS:
      return {
        ...state,
        myProducts: action.payload.myProducts || [],
      };
    case ActionTypes.CREATE_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload.product],
        myProducts: [...state.myProducts, action.payload.product],
      };
    }
    case ActionTypes.RECEIVE_DETAIL_PRODUCT: {
      return {
        ...state,
        product: action.payload.product,
      };
    }
    case ActionTypes.UPDATE_PRODUCT: {
      const updatedProduct = action.payload.product;
      const updatedProducts = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      const updatedMyProducts = state.myProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      return {
        ...state,
        products: updatedProducts,
        myProducts: updatedMyProducts,
      };
    }
    case ActionTypes.DELETE_PRODUCT: {
      const productId = action.payload.productId;
      return {
        ...state,
        products: state.products.filter((product) => product.id !== productId),
        myProducts: state.myProducts.filter(
          (product) => product.id !== productId
        ),
      };
    }
    default:
      return state;
  }
};

export default productReducer;
