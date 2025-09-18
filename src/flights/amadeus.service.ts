import { Injectable } from '@nestjs/common';
import Amadeus from 'amadeus';


@Injectable()
export class AmadeusService {
  private amadeus: Amadeus;

  constructor() {
    this.amadeus = new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    });
  }

  async searchFlights(origin: string, destination: string, travelDate: string) {
    try {
      const response = await this.amadeus.shopping.flightOffersSearch.get({
        originLocationCode: origin,         // e.g. "CAI"
        destinationLocationCode: destination, // e.g. "JFK"
        departureDate: travelDate,           // YYYY-MM-DD
        adults: 1,
        max: 3, // how many results to fetch
      });

      return response.data.map((offer: any) => ({
        airline: offer.validatingAirlineCodes?.[0],
        price: offer.price.total,
        currency: offer.price.currency,
      }));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch flights from Amadeus');
    }
  }
}
