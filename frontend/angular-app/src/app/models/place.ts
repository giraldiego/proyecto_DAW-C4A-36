export interface Place {
    id?: string;
    city: string;
    type: string;
    offerType: string;
    price: number;
    status?: string;
    creator?: string;
    urlPicture?: string;
  }

export const TYPE = ['apartamento', 'casa', 'local'];
export const OFFER_TYPE = ['alquiler', 'venta'];
export const STATUS = ['activo', 'inactivo', 'comprado', 'ocupado'];
