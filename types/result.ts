export type Images = {
  edges: {
    node: {
      width: number;
      height: number;
      altText: string;
      originalSrc: string;
    };
  }[];
};

export type PriceRange = {
  minVariantPrice: {
    amount: number;
    currencyCode: string;
  };
};

export type Item = {
  node: {
    vendor: string;
    description: string;
    handle: string;
    title: string;
    id: string;
    images?: Images;
    priceRange?: PriceRange;
    availableForSale: boolean;
    createdAt: string;
  };
};

export type ShopifyResult = {
  data: {
    products: {
      length: number;
      edges: Item[];
    };
  };
} | null;
