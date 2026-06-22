package com.osman;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/TemperatureMeasurement")
public class TempApi {

    private static final TempUnit CELSIUS = new Celsius();
    private static final TempUnit FAHRENHEIT = new Fahrenheit();

    @GET
    @Path("/celsius-to-fahrenheit/{temperature}")
    @Produces(MediaType.APPLICATION_JSON)
    public TemperatureResponse getFahrenheit(@PathParam("temperature") double temperature) {
            return new TemperatureResponse(
                    Converter.convert(temperature, CELSIUS, FAHRENHEIT)
            );
    }


    @GET
    @Path("/fahrenheit-to-celsius/{temperature}")
    @Produces(MediaType.APPLICATION_JSON)
    public TemperatureResponse getCelsius(@PathParam("temperature") double temperature) {
        return new TemperatureResponse(
                Converter.convert(temperature, FAHRENHEIT, CELSIUS)
        );
    }

}
