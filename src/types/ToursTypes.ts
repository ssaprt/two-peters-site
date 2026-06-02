// base
export type BaseBlock<T extends string, D> = {
  id: string;
  type: T;
  data: D;
};

// blocks

export type TourBlock = BaseBlock<
  "tour",
  {
    title: string;
    price: string;
    features: {
      id: string;
      text: string;
    }[];
  }
>;

export type AdditionalBlock = BaseBlock<
  "additional",
  {
    title: string;
    items: { id: string; text: string; price: string }[];
  }
>;

export type BookingBlock = BaseBlock<
  "booking",
  {
    phone: string;
    text: string;
  }
>;

export type TourismBlock = TourBlock | AdditionalBlock | BookingBlock;

export type TourDTO = {
  id: string;
  title: string;
  address: string;
  active: 1 | 0;
  blocks: TourismBlock[];
  images: string[];
};
