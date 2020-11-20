import { DecimalPipe } from '@angular/common';
import { User } from './user.model';

export class propertyuser {
    Id: string;
    Price: number;//listo
    Bedrooms: number;//listo
    Bathrooms: number;//listo
    Size: number;//listo
    Direction: string;//listo
    State: boolean;//listo
    Description: string;//listo
    Latitude: string;//listo
    Longitude: string;//listo
    Category: number;
    TypeProperty: number;
    UserIdPro: string;
    imageurl: string;
    imagen64portada: string;
    User: User
}
