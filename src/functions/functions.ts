import axios from "axios";
export interface Product {
    brandName: string;
    compare_at_price: number;
    furrlDiscountPercent: number;
    furrlProductCategoryList: {
      furrlProductCategoryId: string;
      furrlProductCategoryName: string;
      relevanceScore: number;
      source: string;
      _id: string;
    }[];
    id: string;
    images: {
      admin_graphql_api_id: string;
      alt: string;
      created_at: string;
      height: number;
      id: number;
      position: number;
      product_id: string;
      src: string;
      updated_at: string;
      variant_ids: number[];
      width: number;
      _id: string;
    }[];
    price: number;
    productid: string;
    title: string;
    variants: {
      admin_graphql_api_id: string;
      barcode: string;
      compare_at_price: null | string;
      created_at: string;
      fulfillment_service: string;
      grams: number;
      id: number;
      image_id: string;
      inventory_item_id: number;
      inventory_management: string;
      inventory_policy: string;
      inventory_quantity: number;
      old_inventory_quantity: number;
      option1: string;
      option2: null | string;
      option3: null | string;
      position: number;
      price: string;
      product_id: string;
      requires_shipping: boolean;
      sku: string;
      taxable: boolean;
      title: string;
      updated_at: string;
      weight: number;
      weight_unit: string;
      _id: string;
    }[];
    vendor: string;
  }

  export async function getData(pagesLoaded:number) {
    try {
      const response = await axios.post(
        'https://api.furrl.in/api/v1/vibe/getVibeRelate?visitId=&page=1',
        {
          visitId: '',
          page: pagesLoaded,
          vibe: '#NightFlea',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data.productData; // Return the fetched product data
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the component
    }
  }