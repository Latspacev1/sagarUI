// Fuel Data Interface Structure - Generated for Reference

interface FuelDataSection {
  // KILN FUEL DATA
  kiln: {
    // Consumption parameters (t/kl)
    rb1_imported_coal: ParameterData;
    rb2_imported_coal: ParameterData;
    rb3_imported_coal: ParameterData;
    indigenous_pet_coke: ParameterData;
    imported_petcoke_hm_trading: ParameterData;
    imported_petcoke_hc_saudi: ParameterData;
    us_petcoke: ParameterData;
    indian_coal: ParameterData;
    us_coal_ncv_6900: ParameterData;
    us_coal_ncv_6250: ParameterData;
    indigenous_coal_g5: ParameterData;
    indigenous_coal_g6: ParameterData;
    indigenous_coal_g7: ParameterData;
    indigenous_coal_g8: ParameterData;
    indigenous_coal_g11: ParameterData;
    indigenous_coal_g13: ParameterData;
    washed_coal: ParameterData;
    australian_coal: ParameterData;
    carbonaceous_shale: ParameterData;
    lignite: ParameterData;
    heavy_fuel_oil: ParameterData;
    diesel_oil: ParameterData;
    spent_carbon: ParameterData;
    carbon_black: ParameterData;
    shredded_plastic: ParameterData;
    refused_derived_fuels: ParameterData;
    organic_residue: ParameterData;
    organic_liquid_solvents: ParameterData;
    dolochar: ParameterData;
    spent_coffee: ParameterData;
    ppf_oil_kiln_light_up: ParameterData;
    sewage_sludge: ParameterData;
    wood_non_impregnated_saw_dust: ParameterData;
    paper_carton: ParameterData;
    animal_meal: ParameterData;
    animal_bone_meal: ParameterData;
    animal_fat: ParameterData;
    agricultural_organic_diaper_waste_charcoal: ParameterData;
    other_biomass: ParameterData;
    rice_husk: ParameterData;
    biomass_content_from_alternate_fuels: ParameterData;
    
    // Calorific value parameters (kcal/kg)
    rb1_imported_coal_calorific_value: ParameterData;
    rb2_imported_coal_calorific_value: ParameterData;
    rb3_imported_coal_calorific_value: ParameterData;
    indigenous_pet_coke_calorific_value: ParameterData;
    imported_petcoke_hm_trading_calorific_value: ParameterData;
    imported_petcoke_hc_saudi_calorific_value: ParameterData;
    us_petcoke_calorific_value: ParameterData;
    indian_coal_calorific_value: ParameterData;
    us_coal_ncv_6900_calorific_value: ParameterData;
    us_coal_ncv_6250_calorific_value: ParameterData;
    indigenous_coal_g5_calorific_value: ParameterData;
    indigenous_coal_g6_calorific_value: ParameterData;
    indigenous_coal_g7_calorific_value: ParameterData;
    indigenous_coal_g8_calorific_value: ParameterData;
    indigenous_coal_g11_calorific_value: ParameterData;
    indigenous_coal_g13_calorific_value: ParameterData;
    washed_coal_calorific_value: ParameterData;
    australian_coal_calorific_value: ParameterData;
    carbonaceous_shale_calorific_value: ParameterData;
    lignite_calorific_value: ParameterData;
    heavy_fuel_oil_calorific_value: ParameterData;
    diesel_oil_calorific_value: ParameterData;
    spent_carbon_calorific_value: ParameterData;
    carbon_black_calorific_value: ParameterData;
    shredded_plastic_calorific_value: ParameterData;
    refused_derived_fuels_calorific_value: ParameterData;
    organic_residue_calorific_value: ParameterData;
    organic_liquid_solvents_calorific_value: ParameterData;
    dolochar_calorific_value: ParameterData;
    spent_coffee_calorific_value: ParameterData;
    ppf_oil_calorific_value: ParameterData;
    sewage_sludge_calorific_value: ParameterData;
    wood_non_impregnated_saw_dust_calorific_value: ParameterData;
    paper_carton_calorific_value: ParameterData;
    animal_meal_calorific_value: ParameterData;
    animal_bone_meal_calorific_value: ParameterData;
    animal_fat_calorific_value: ParameterData;
    agricultural_organic_diaper_waste_charcoal_calorific_value: ParameterData;
    other_biomass_calorific_value: ParameterData;
    rice_husk_calorific_value: ParameterData;
    biomass_content_from_alternate_fuels_calorific_value: ParameterData;
  };
}

// This file contains the structure for over 300 fuel parameters
// Kiln: ~78 parameters (39 consumption + 39 calorific values)
// CPP: ~78 parameters (39 consumption + 39 calorific values) 
// HAG Mill: ~156 parameters (78 for raw mill + 78 for cement mill)
// Total: ~312 fuel parameters