package justartschool.backend.services;

import justartschool.backend.dtos.*;
import justartschool.backend.models.entities.City;
import justartschool.backend.models.entities.Country;
import justartschool.backend.models.entities.County;
import justartschool.backend.repositories.ICitiesRepository;
import justartschool.backend.repositories.ICountriesRepository;
import justartschool.backend.repositories.ICountiesRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AddressService {
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;
    private final ICountriesRepository countryRepository;
    private final ICountiesRepository countyRepository;
    private final ICitiesRepository cityRepository;

    public Country addCountry(Country country) {
        country = countryRepository.save(country);
        return country;
    }

    public County addCounty(County county) {
        county = countyRepository.save(county);
        return county;
    }

    public City addCity(City city) {
        city = cityRepository.save(city);
        return city;
    }

    public List<CountryDto> getCountries() {
        List<Country> countries = countryRepository.findAll();

        return countries.stream()
                .map(CountryDto::new)
                .toList();
    }

    public List<CountyDto> getCounties() {
        List<County> counties = countyRepository.findAll();
        return counties.stream()
                .map(CountyDto::new)
                .toList();
    }

    public List<CityDto> getCities() {
        List<City> cities = cityRepository.findAll();

        return cities.stream()
                .map(CityDto::new)
                .toList();

    }

    public List<CityDto> getCitiesByCountyId(UUID countyId) throws BadRequestException {
        if (countyId == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("CountyId is empty");

        List<City> cities = cityRepository.findCityByCountyCountyId(countyId);

        return cities.stream()
                .map(CityDto::new)
                .toList();
    }

    public City getCityById(UUID cityId) {
        return cityRepository.getCityByCityId(cityId);
    }

    public void addCountryWithCountiesAndCities(CountryLocationDto countryLocationDto) throws Exception {
        Country country = modelMapper.map(countryLocationDto, Country.class);
        country = addCountry(country);

        if (country == null) {
            throw new Exception("Error adding country.");
        }
        List<CountyLocationDto> countyDtoList = countryLocationDto.getCountyLocationDtoList();
        for (CountyLocationDto countyDto : countyDtoList) {
            County county = modelMapper.map(countyDto, County.class);
            county.setCountry(country);

            county = addCounty(county);

            if (county == null) {
                throw new Exception("Error adding county.");
            }

            List<CityLocationDto> cityDtoList = countyDto.getCityLocationDtoList();
            for (CityLocationDto cityDto : cityDtoList) {
                City city = modelMapper.map(cityDto, City.class);
                city.setCounty(county);

                city = addCity(city);

                if (city == null) {
                    throw new Exception("Error adding city.");
                }
            }
        }
    }
}