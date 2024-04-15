import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { validate } from "class-validator";
import { Country, InputCountry } from "../entities/Country";

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    try {
      const data = await Country.findOne({
        where: {
          code: code,
        },
      });
      return data;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Query(() => [Country], { nullable: true })
  async getCountriesByContinent(
    @Arg("continent") continent: string
  ): Promise<Country[] | null> {
    try {
      const data = await Country.find({
        where: {
          continent: continent,
        },
      });
      return data;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Country)
  async addNewCountry(
    @Arg("data", () => InputCountry) inputCountry: InputCountry
  ): Promise<Country> {
    try {
      const newCountry = new Country();
      newCountry.code = inputCountry.code;
      newCountry.name = inputCountry.name;
      newCountry.emoji = inputCountry.emoji;
      newCountry.continent = inputCountry.continent;
      const error = await validate(newCountry);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const data = await newCountry.save();
        return data;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
