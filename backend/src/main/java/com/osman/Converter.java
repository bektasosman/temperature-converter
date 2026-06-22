package com.osman;

public class Converter{

    static double convert(double value, TempUnit fromUnit, TempUnit toUnit) {
        double kelvin = fromUnit.toKelvin(value);
        return toUnit.fromKelvin(kelvin);
    }
}
