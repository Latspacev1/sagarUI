import React, { useState } from 'react';
import { Layout } from '../layout/Layout';
import { Save, RotateCcw, CheckCircle } from 'lucide-react';

interface ParameterData {
  value: string;
  month: string;
  year: string;
}

interface FormData {
  production: {
    clinker_production: ParameterData;
    clinker_consumption: ParameterData;
    clinker_export: ParameterData;
    clinker_import: ParameterData;
    rawmeal_production: ParameterData;
    natural_gypsum_consumed: ParameterData;
    limestone_consumed_as_raw_material: ParameterData;
    total_cement_dispatched: ParameterData;
    total_opc_produced: ParameterData;
    total_ppc_produced: ParameterData;
    total_psc_produced: ParameterData;
    total_cc_produced: ParameterData;
    total_ipc_produced: ParameterData;
    total_super_ppc_produced: ParameterData;
    total_ggbs_produced: ParameterData;
    total_super_opc_produced: ParameterData;
    kiln_operating_hours: ParameterData;
    kiln_feed_rate: ParameterData;
  };
  energy_data: {
    total_power_generation_onsite_power_plant: ParameterData;
    power_delivered_cement_plant_onsite: ParameterData;
    total_power_generation_whrs_power_plant: ParameterData;
    power_delivered_cement_plant_whrs: ParameterData;
    total_power_generation_solar_power_plant: ParameterData;
    power_delivered_cement_plant_solar: ParameterData;
    power_delivered_cement_plant_hydel: ParameterData;
    total_grid_power_consumed: ParameterData;
    power_delivered_cement_plant_grid: ParameterData;
    dg_power_consumption: ParameterData;
    onsite_power_generation_export_to_grid: ParameterData;
    total_power_consumption_up_to_clinker_production: ParameterData;
    ls_crusher_power_consumption: ParameterData;
    raw_mill_power_consumption: ParameterData;
    pyro_power_consumption: ParameterData;
    coal_mill_power_consumption: ParameterData;
    power_consumption_cement_grinding: ParameterData;
    power_consumption_cement_packing: ParameterData;
    power_consumption_utilities_others: ParameterData;
    power_consumption_opc: ParameterData;
    power_consumption_ppc: ParameterData;
    power_consumption_psc: ParameterData;
    power_consumption_cc: ParameterData;
    power_consumption_ipc: ParameterData;
    power_consumption_super_ppc: ParameterData;
    power_consumption_ggbs: ParameterData;
    power_consumption_super_opc: ParameterData;
  };
  emissions_data: {
    clinker_cao_including_freelime: ParameterData;
    clinker_mgo: ParameterData;
    imported_coal_ash_content: ParameterData;
    indigenous_coal_ash_content: ParameterData;
    lignite_ash_content: ParameterData;
    pet_coke_ash_content: ParameterData;
    rice_husk_ash_content: ParameterData;
    tyres_spent_carbon_ash_content: ParameterData;
    coal_ash_cao: ParameterData;
    coal_ash_mgo: ParameterData;
  };
  fuel_data: {
    kiln: {
      // Kiln Base Fuel Consumption
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
      // Kiln Alternative Fuel Consumption
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
      // Kiln Calorific Values
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
    cpp: {
      // CPP Base Fuel Consumption
      cpp_rb1_imported_coal: ParameterData;
      cpp_rb2_imported_coal: ParameterData;
      cpp_rb3_imported_coal: ParameterData;
      cpp_indigenous_pet_coke: ParameterData;
      cpp_imported_petcoke_hm_trading: ParameterData;
      cpp_imported_petcoke_hc_saudi: ParameterData;
      cpp_us_petcoke: ParameterData;
      cpp_indian_coal: ParameterData;
      cpp_us_coal_ncv_6900: ParameterData;
      cpp_us_coal_ncv_6250: ParameterData;
      cpp_indigenous_coal_g5: ParameterData;
      cpp_indigenous_coal_g6: ParameterData;
      cpp_indigenous_coal_g7: ParameterData;
      cpp_indigenous_coal_g8: ParameterData;
      cpp_indigenous_coal_g11: ParameterData;
      cpp_indigenous_coal_g13: ParameterData;
      cpp_washed_coal: ParameterData;
      cpp_australian_coal: ParameterData;
      cpp_carbonaceous_shale: ParameterData;
      cpp_lignite: ParameterData;
      cpp_heavy_fuel_oil: ParameterData;
      cpp_diesel_oil: ParameterData;
      // CPP Alternative Fuel Consumption
      cpp_spent_carbon: ParameterData;
      cpp_carbon_black: ParameterData;
      cpp_shredded_plastic: ParameterData;
      cpp_refused_derived_fuels: ParameterData;
      cpp_organic_residue: ParameterData;
      cpp_organic_liquid_solvents: ParameterData;
      cpp_dolochar: ParameterData;
      cpp_spent_coffee: ParameterData;
      cpp_ppf_oil: ParameterData;
      cpp_sewage_sludge: ParameterData;
      cpp_wood_non_impregnated_saw_dust: ParameterData;
      cpp_paper_carton: ParameterData;
      cpp_animal_meal: ParameterData;
      cpp_animal_bone_meal: ParameterData;
      cpp_animal_fat: ParameterData;
      cpp_agricultural_organic_diaper_waste_charcoal: ParameterData;
      cpp_other_biomass: ParameterData;
      cpp_rice_husk: ParameterData;
      cpp_biomass_content_from_alternate_fuels: ParameterData;
      // CPP Calorific Values
      cpp_rb1_imported_coal_calorific_value: ParameterData;
      cpp_rb2_imported_coal_calorific_value: ParameterData;
      cpp_rb3_imported_coal_calorific_value: ParameterData;
      cpp_indigenous_pet_coke_calorific_value: ParameterData;
      cpp_imported_petcoke_hm_trading_calorific_value: ParameterData;
      cpp_imported_petcoke_hc_saudi_calorific_value: ParameterData;
      cpp_us_petcoke_calorific_value: ParameterData;
      cpp_indian_coal_calorific_value: ParameterData;
      cpp_us_coal_ncv_6900_calorific_value: ParameterData;
      cpp_us_coal_ncv_6250_calorific_value: ParameterData;
      cpp_indigenous_coal_g5_calorific_value: ParameterData;
      cpp_indigenous_coal_g6_calorific_value: ParameterData;
      cpp_indigenous_coal_g7_calorific_value: ParameterData;
      cpp_indigenous_coal_g8_calorific_value: ParameterData;
      cpp_indigenous_coal_g11_calorific_value: ParameterData;
      cpp_indigenous_coal_g13_calorific_value: ParameterData;
      cpp_washed_coal_calorific_value: ParameterData;
      cpp_australian_coal_calorific_value: ParameterData;
      cpp_carbonaceous_shale_calorific_value: ParameterData;
      cpp_lignite_calorific_value: ParameterData;
      cpp_heavy_fuel_oil_calorific_value: ParameterData;
      cpp_diesel_oil_calorific_value: ParameterData;
      cpp_spent_carbon_calorific_value: ParameterData;
      cpp_carbon_black_calorific_value: ParameterData;
      cpp_shredded_plastic_calorific_value: ParameterData;
      cpp_refused_derived_fuels_calorific_value: ParameterData;
      cpp_organic_residue_calorific_value: ParameterData;
      cpp_organic_liquid_solvents_calorific_value: ParameterData;
      cpp_dolochar_calorific_value: ParameterData;
      cpp_spent_coffee_calorific_value: ParameterData;
      cpp_ppf_oil_calorific_value: ParameterData;
      cpp_sewage_sludge_calorific_value: ParameterData;
      cpp_wood_non_impregnated_saw_dust_calorific_value: ParameterData;
      cpp_paper_carton_calorific_value: ParameterData;
      cpp_animal_meal_calorific_value: ParameterData;
      cpp_animal_bone_meal_calorific_value: ParameterData;
      cpp_animal_fat_calorific_value: ParameterData;
      cpp_agricultural_organic_diaper_waste_charcoal_calorific_value: ParameterData;
      cpp_other_biomass_calorific_value: ParameterData;
      cpp_rice_husk_calorific_value: ParameterData;
      cpp_biomass_content_from_alternate_fuels_calorific_value: ParameterData;
    };
    hag_cement_mill: {
      // HAG Cement Mill Base Fuel Consumption
      hag_cement_mill_rb1_imported_coal: ParameterData;
      hag_cement_mill_rb2_imported_coal: ParameterData;
      hag_cement_mill_rb3_imported_coal: ParameterData;
      hag_cement_mill_indigenous_pet_coke: ParameterData;
      hag_cement_mill_imported_petcoke_hm_trading: ParameterData;
      hag_cement_mill_imported_petcoke_hc_saudi: ParameterData;
      hag_cement_mill_us_petcoke: ParameterData;
      hag_cement_mill_indian_coal: ParameterData;
      hag_cement_mill_us_coal_ncv_6900: ParameterData;
      hag_cement_mill_us_coal_ncv_6250: ParameterData;
      hag_cement_mill_indigenous_coal_g5: ParameterData;
      hag_cement_mill_indigenous_coal_g6: ParameterData;
      hag_cement_mill_indigenous_coal_g7: ParameterData;
      hag_cement_mill_indigenous_coal_g8: ParameterData;
      hag_cement_mill_indigenous_coal_g11: ParameterData;
      hag_cement_mill_indigenous_coal_g13: ParameterData;
      hag_cement_mill_washed_coal: ParameterData;
      hag_cement_mill_australian_coal: ParameterData;
      hag_cement_mill_carbonaceous_shale: ParameterData;
      hag_cement_mill_lignite: ParameterData;
      hag_cement_mill_heavy_fuel_oil: ParameterData;
      hag_cement_mill_diesel_oil: ParameterData;
      // HAG Cement Mill Alternative Fuel Consumption
      hag_cement_mill_spent_carbon: ParameterData;
      hag_cement_mill_carbon_black: ParameterData;
      hag_cement_mill_shredded_plastic: ParameterData;
      hag_cement_mill_refused_derived_fuels: ParameterData;
      hag_cement_mill_organic_residue: ParameterData;
      hag_cement_mill_organic_liquid_solvents: ParameterData;
      hag_cement_mill_dolochar: ParameterData;
      hag_cement_mill_spent_coffee: ParameterData;
      hag_cement_mill_ppf_oil: ParameterData;
      hag_cement_mill_sewage_sludge: ParameterData;
      hag_cement_mill_wood_non_impregnated_saw_dust: ParameterData;
      hag_cement_mill_paper_carton: ParameterData;
      hag_cement_mill_animal_meal: ParameterData;
      hag_cement_mill_animal_bone_meal: ParameterData;
      hag_cement_mill_animal_fat: ParameterData;
      hag_cement_mill_agricultural_organic_diaper_waste_charcoal: ParameterData;
      hag_cement_mill_other_biomass: ParameterData;
      hag_cement_mill_rice_husk: ParameterData;
      hag_cement_mill_biomass_content_from_alternate_fuels: ParameterData;
      // HAG Cement Mill Calorific Values
      hag_cement_mill_rb1_imported_coal_calorific_value: ParameterData;
      hag_cement_mill_rb2_imported_coal_calorific_value: ParameterData;
      hag_cement_mill_rb3_imported_coal_calorific_value: ParameterData;
      hag_cement_mill_indigenous_pet_coke_calorific_value: ParameterData;
      hag_cement_mill_imported_petcoke_hm_trading_calorific_value: ParameterData;
      hag_cement_mill_imported_petcoke_hc_saudi_calorific_value: ParameterData;
      hag_cement_mill_us_petcoke_calorific_value: ParameterData;
      hag_cement_mill_indian_coal_calorific_value: ParameterData;
      hag_cement_mill_us_coal_ncv_6900_calorific_value: ParameterData;
      hag_cement_mill_us_coal_ncv_6250_calorific_value: ParameterData;
      hag_cement_mill_indigenous_coal_g5_calorific_value: ParameterData;
      hag_cement_mill_indigenous_coal_g6_calorific_value: ParameterData;
      hag_cement_mill_indigenous_coal_g7_calorific_value: ParameterData;
      hag_cement_mill_indigenous_coal_g8_calorific_value: ParameterData;
      hag_cement_mill_indigenous_coal_g11_calorific_value: ParameterData;
      hag_cement_mill_indigenous_coal_g13_calorific_value: ParameterData;
      hag_cement_mill_washed_coal_calorific_value: ParameterData;
      hag_cement_mill_australian_coal_calorific_value: ParameterData;
      hag_cement_mill_carbonaceous_shale_calorific_value: ParameterData;
      hag_cement_mill_lignite_calorific_value: ParameterData;
      hag_cement_mill_heavy_fuel_oil_calorific_value: ParameterData;
      hag_cement_mill_diesel_oil_calorific_value: ParameterData;
      hag_cement_mill_spent_carbon_calorific_value: ParameterData;
      hag_cement_mill_carbon_black_calorific_value: ParameterData;
      hag_cement_mill_shredded_plastic_calorific_value: ParameterData;
      hag_cement_mill_refused_derived_fuels_calorific_value: ParameterData;
      hag_cement_mill_organic_residue_calorific_value: ParameterData;
      hag_cement_mill_organic_liquid_solvents_calorific_value: ParameterData;
      hag_cement_mill_dolochar_calorific_value: ParameterData;
      hag_cement_mill_spent_coffee_calorific_value: ParameterData;
      hag_cement_mill_ppf_oil_calorific_value: ParameterData;
      hag_cement_mill_sewage_sludge_calorific_value: ParameterData;
      hag_cement_mill_wood_non_impregnated_saw_dust_calorific_value: ParameterData;
      hag_cement_mill_paper_carton_calorific_value: ParameterData;
      hag_cement_mill_animal_meal_calorific_value: ParameterData;
      hag_cement_mill_animal_bone_meal_calorific_value: ParameterData;
      hag_cement_mill_animal_fat_calorific_value: ParameterData;
      hag_cement_mill_agricultural_organic_diaper_waste_charcoal_calorific_value: ParameterData;
      hag_cement_mill_other_biomass_calorific_value: ParameterData;
      hag_cement_mill_rice_husk_calorific_value: ParameterData;
      hag_cement_mill_biomass_content_from_alternate_fuels_calorific_value: ParameterData;
    };
  };
}

const createEmptyParameter = (): ParameterData => ({ value: '', month: '', year: '' });

const initialFormData: FormData = {
  production: {
    clinker_production: createEmptyParameter(),
    clinker_consumption: createEmptyParameter(),
    clinker_export: createEmptyParameter(),
    clinker_import: createEmptyParameter(),
    rawmeal_production: createEmptyParameter(),
    natural_gypsum_consumed: createEmptyParameter(),
    limestone_consumed_as_raw_material: createEmptyParameter(),
    total_cement_dispatched: createEmptyParameter(),
    total_opc_produced: createEmptyParameter(),
    total_ppc_produced: createEmptyParameter(),
    total_psc_produced: createEmptyParameter(),
    total_cc_produced: createEmptyParameter(),
    total_ipc_produced: createEmptyParameter(),
    total_super_ppc_produced: createEmptyParameter(),
    total_ggbs_produced: createEmptyParameter(),
    total_super_opc_produced: createEmptyParameter(),
    kiln_operating_hours: createEmptyParameter(),
    kiln_feed_rate: createEmptyParameter()
  },
  energy_data: {
    total_power_generation_onsite_power_plant: createEmptyParameter(),
    power_delivered_cement_plant_onsite: createEmptyParameter(),
    total_power_generation_whrs_power_plant: createEmptyParameter(),
    power_delivered_cement_plant_whrs: createEmptyParameter(),
    total_power_generation_solar_power_plant: createEmptyParameter(),
    power_delivered_cement_plant_solar: createEmptyParameter(),
    power_delivered_cement_plant_hydel: createEmptyParameter(),
    total_grid_power_consumed: createEmptyParameter(),
    power_delivered_cement_plant_grid: createEmptyParameter(),
    dg_power_consumption: createEmptyParameter(),
    onsite_power_generation_export_to_grid: createEmptyParameter(),
    total_power_consumption_up_to_clinker_production: createEmptyParameter(),
    ls_crusher_power_consumption: createEmptyParameter(),
    raw_mill_power_consumption: createEmptyParameter(),
    pyro_power_consumption: createEmptyParameter(),
    coal_mill_power_consumption: createEmptyParameter(),
    power_consumption_cement_grinding: createEmptyParameter(),
    power_consumption_cement_packing: createEmptyParameter(),
    power_consumption_utilities_others: createEmptyParameter(),
    power_consumption_opc: createEmptyParameter(),
    power_consumption_ppc: createEmptyParameter(),
    power_consumption_psc: createEmptyParameter(),
    power_consumption_cc: createEmptyParameter(),
    power_consumption_ipc: createEmptyParameter(),
    power_consumption_super_ppc: createEmptyParameter(),
    power_consumption_ggbs: createEmptyParameter(),
    power_consumption_super_opc: createEmptyParameter()
  },
  emissions_data: {
    clinker_cao_including_freelime: createEmptyParameter(),
    clinker_mgo: createEmptyParameter(),
    imported_coal_ash_content: createEmptyParameter(),
    indigenous_coal_ash_content: createEmptyParameter(),
    lignite_ash_content: createEmptyParameter(),
    pet_coke_ash_content: createEmptyParameter(),
    rice_husk_ash_content: createEmptyParameter(),
    tyres_spent_carbon_ash_content: createEmptyParameter(),
    coal_ash_cao: createEmptyParameter(),
    coal_ash_mgo: createEmptyParameter()
  },
  fuel_data: {
    kiln: {
      // Kiln Base Fuel Consumption
      rb1_imported_coal: createEmptyParameter(),
      rb2_imported_coal: createEmptyParameter(),
      rb3_imported_coal: createEmptyParameter(),
      indigenous_pet_coke: createEmptyParameter(),
      imported_petcoke_hm_trading: createEmptyParameter(),
      imported_petcoke_hc_saudi: createEmptyParameter(),
      us_petcoke: createEmptyParameter(),
      indian_coal: createEmptyParameter(),
      us_coal_ncv_6900: createEmptyParameter(),
      us_coal_ncv_6250: createEmptyParameter(),
      indigenous_coal_g5: createEmptyParameter(),
      indigenous_coal_g6: createEmptyParameter(),
      indigenous_coal_g7: createEmptyParameter(),
      indigenous_coal_g8: createEmptyParameter(),
      indigenous_coal_g11: createEmptyParameter(),
      indigenous_coal_g13: createEmptyParameter(),
      washed_coal: createEmptyParameter(),
      australian_coal: createEmptyParameter(),
      carbonaceous_shale: createEmptyParameter(),
      lignite: createEmptyParameter(),
      heavy_fuel_oil: createEmptyParameter(),
      diesel_oil: createEmptyParameter(),
      // Kiln Alternative Fuel Consumption
      spent_carbon: createEmptyParameter(),
      carbon_black: createEmptyParameter(),
      shredded_plastic: createEmptyParameter(),
      refused_derived_fuels: createEmptyParameter(),
      organic_residue: createEmptyParameter(),
      organic_liquid_solvents: createEmptyParameter(),
      dolochar: createEmptyParameter(),
      spent_coffee: createEmptyParameter(),
      ppf_oil_kiln_light_up: createEmptyParameter(),
      sewage_sludge: createEmptyParameter(),
      wood_non_impregnated_saw_dust: createEmptyParameter(),
      paper_carton: createEmptyParameter(),
      animal_meal: createEmptyParameter(),
      animal_bone_meal: createEmptyParameter(),
      animal_fat: createEmptyParameter(),
      agricultural_organic_diaper_waste_charcoal: createEmptyParameter(),
      other_biomass: createEmptyParameter(),
      rice_husk: createEmptyParameter(),
      biomass_content_from_alternate_fuels: createEmptyParameter(),
      // Kiln Calorific Values
      rb1_imported_coal_calorific_value: createEmptyParameter(),
      rb2_imported_coal_calorific_value: createEmptyParameter(),
      rb3_imported_coal_calorific_value: createEmptyParameter(),
      indigenous_pet_coke_calorific_value: createEmptyParameter(),
      imported_petcoke_hm_trading_calorific_value: createEmptyParameter(),
      imported_petcoke_hc_saudi_calorific_value: createEmptyParameter(),
      us_petcoke_calorific_value: createEmptyParameter(),
      indian_coal_calorific_value: createEmptyParameter(),
      us_coal_ncv_6900_calorific_value: createEmptyParameter(),
      us_coal_ncv_6250_calorific_value: createEmptyParameter(),
      indigenous_coal_g5_calorific_value: createEmptyParameter(),
      indigenous_coal_g6_calorific_value: createEmptyParameter(),
      indigenous_coal_g7_calorific_value: createEmptyParameter(),
      indigenous_coal_g8_calorific_value: createEmptyParameter(),
      indigenous_coal_g11_calorific_value: createEmptyParameter(),
      indigenous_coal_g13_calorific_value: createEmptyParameter(),
      washed_coal_calorific_value: createEmptyParameter(),
      australian_coal_calorific_value: createEmptyParameter(),
      carbonaceous_shale_calorific_value: createEmptyParameter(),
      lignite_calorific_value: createEmptyParameter(),
      heavy_fuel_oil_calorific_value: createEmptyParameter(),
      diesel_oil_calorific_value: createEmptyParameter(),
      spent_carbon_calorific_value: createEmptyParameter(),
      carbon_black_calorific_value: createEmptyParameter(),
      shredded_plastic_calorific_value: createEmptyParameter(),
      refused_derived_fuels_calorific_value: createEmptyParameter(),
      organic_residue_calorific_value: createEmptyParameter(),
      organic_liquid_solvents_calorific_value: createEmptyParameter(),
      dolochar_calorific_value: createEmptyParameter(),
      spent_coffee_calorific_value: createEmptyParameter(),
      ppf_oil_calorific_value: createEmptyParameter(),
      sewage_sludge_calorific_value: createEmptyParameter(),
      wood_non_impregnated_saw_dust_calorific_value: createEmptyParameter(),
      paper_carton_calorific_value: createEmptyParameter(),
      animal_meal_calorific_value: createEmptyParameter(),
      animal_bone_meal_calorific_value: createEmptyParameter(),
      animal_fat_calorific_value: createEmptyParameter(),
      agricultural_organic_diaper_waste_charcoal_calorific_value: createEmptyParameter(),
      other_biomass_calorific_value: createEmptyParameter(),
      rice_husk_calorific_value: createEmptyParameter(),
      biomass_content_from_alternate_fuels_calorific_value: createEmptyParameter()
    },
    cpp: {
      // CPP Base Fuel Consumption
      cpp_rb1_imported_coal: createEmptyParameter(),
      cpp_rb2_imported_coal: createEmptyParameter(),
      cpp_rb3_imported_coal: createEmptyParameter(),
      cpp_indigenous_pet_coke: createEmptyParameter(),
      cpp_imported_petcoke_hm_trading: createEmptyParameter(),
      cpp_imported_petcoke_hc_saudi: createEmptyParameter(),
      cpp_us_petcoke: createEmptyParameter(),
      cpp_indian_coal: createEmptyParameter(),
      cpp_us_coal_ncv_6900: createEmptyParameter(),
      cpp_us_coal_ncv_6250: createEmptyParameter(),
      cpp_indigenous_coal_g5: createEmptyParameter(),
      cpp_indigenous_coal_g6: createEmptyParameter(),
      cpp_indigenous_coal_g7: createEmptyParameter(),
      cpp_indigenous_coal_g8: createEmptyParameter(),
      cpp_indigenous_coal_g11: createEmptyParameter(),
      cpp_indigenous_coal_g13: createEmptyParameter(),
      cpp_washed_coal: createEmptyParameter(),
      cpp_australian_coal: createEmptyParameter(),
      cpp_carbonaceous_shale: createEmptyParameter(),
      cpp_lignite: createEmptyParameter(),
      cpp_heavy_fuel_oil: createEmptyParameter(),
      cpp_diesel_oil: createEmptyParameter(),
      // CPP Alternative Fuel Consumption
      cpp_spent_carbon: createEmptyParameter(),
      cpp_carbon_black: createEmptyParameter(),
      cpp_shredded_plastic: createEmptyParameter(),
      cpp_refused_derived_fuels: createEmptyParameter(),
      cpp_organic_residue: createEmptyParameter(),
      cpp_organic_liquid_solvents: createEmptyParameter(),
      cpp_dolochar: createEmptyParameter(),
      cpp_spent_coffee: createEmptyParameter(),
      cpp_ppf_oil: createEmptyParameter(),
      cpp_sewage_sludge: createEmptyParameter(),
      cpp_wood_non_impregnated_saw_dust: createEmptyParameter(),
      cpp_paper_carton: createEmptyParameter(),
      cpp_animal_meal: createEmptyParameter(),
      cpp_animal_bone_meal: createEmptyParameter(),
      cpp_animal_fat: createEmptyParameter(),
      cpp_agricultural_organic_diaper_waste_charcoal: createEmptyParameter(),
      cpp_other_biomass: createEmptyParameter(),
      cpp_rice_husk: createEmptyParameter(),
      cpp_biomass_content_from_alternate_fuels: createEmptyParameter(),
      // CPP Calorific Values
      cpp_rb1_imported_coal_calorific_value: createEmptyParameter(),
      cpp_rb2_imported_coal_calorific_value: createEmptyParameter(),
      cpp_rb3_imported_coal_calorific_value: createEmptyParameter(),
      cpp_indigenous_pet_coke_calorific_value: createEmptyParameter(),
      cpp_imported_petcoke_hm_trading_calorific_value: createEmptyParameter(),
      cpp_imported_petcoke_hc_saudi_calorific_value: createEmptyParameter(),
      cpp_us_petcoke_calorific_value: createEmptyParameter(),
      cpp_indian_coal_calorific_value: createEmptyParameter(),
      cpp_us_coal_ncv_6900_calorific_value: createEmptyParameter(),
      cpp_us_coal_ncv_6250_calorific_value: createEmptyParameter(),
      cpp_indigenous_coal_g5_calorific_value: createEmptyParameter(),
      cpp_indigenous_coal_g6_calorific_value: createEmptyParameter(),
      cpp_indigenous_coal_g7_calorific_value: createEmptyParameter(),
      cpp_indigenous_coal_g8_calorific_value: createEmptyParameter(),
      cpp_indigenous_coal_g11_calorific_value: createEmptyParameter(),
      cpp_indigenous_coal_g13_calorific_value: createEmptyParameter(),
      cpp_washed_coal_calorific_value: createEmptyParameter(),
      cpp_australian_coal_calorific_value: createEmptyParameter(),
      cpp_carbonaceous_shale_calorific_value: createEmptyParameter(),
      cpp_lignite_calorific_value: createEmptyParameter(),
      cpp_heavy_fuel_oil_calorific_value: createEmptyParameter(),
      cpp_diesel_oil_calorific_value: createEmptyParameter(),
      cpp_spent_carbon_calorific_value: createEmptyParameter(),
      cpp_carbon_black_calorific_value: createEmptyParameter(),
      cpp_shredded_plastic_calorific_value: createEmptyParameter(),
      cpp_refused_derived_fuels_calorific_value: createEmptyParameter(),
      cpp_organic_residue_calorific_value: createEmptyParameter(),
      cpp_organic_liquid_solvents_calorific_value: createEmptyParameter(),
      cpp_dolochar_calorific_value: createEmptyParameter(),
      cpp_spent_coffee_calorific_value: createEmptyParameter(),
      cpp_ppf_oil_calorific_value: createEmptyParameter(),
      cpp_sewage_sludge_calorific_value: createEmptyParameter(),
      cpp_wood_non_impregnated_saw_dust_calorific_value: createEmptyParameter(),
      cpp_paper_carton_calorific_value: createEmptyParameter(),
      cpp_animal_meal_calorific_value: createEmptyParameter(),
      cpp_animal_bone_meal_calorific_value: createEmptyParameter(),
      cpp_animal_fat_calorific_value: createEmptyParameter(),
      cpp_agricultural_organic_diaper_waste_charcoal_calorific_value: createEmptyParameter(),
      cpp_other_biomass_calorific_value: createEmptyParameter(),
      cpp_rice_husk_calorific_value: createEmptyParameter(),
      cpp_biomass_content_from_alternate_fuels_calorific_value: createEmptyParameter()
    },
    hag_cement_mill: {
      // HAG Cement Mill Base Fuel Consumption
      hag_cement_mill_rb1_imported_coal: createEmptyParameter(),
      hag_cement_mill_rb2_imported_coal: createEmptyParameter(),
      hag_cement_mill_rb3_imported_coal: createEmptyParameter(),
      hag_cement_mill_indigenous_pet_coke: createEmptyParameter(),
      hag_cement_mill_imported_petcoke_hm_trading: createEmptyParameter(),
      hag_cement_mill_imported_petcoke_hc_saudi: createEmptyParameter(),
      hag_cement_mill_us_petcoke: createEmptyParameter(),
      hag_cement_mill_indian_coal: createEmptyParameter(),
      hag_cement_mill_us_coal_ncv_6900: createEmptyParameter(),
      hag_cement_mill_us_coal_ncv_6250: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g5: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g6: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g7: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g8: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g11: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g13: createEmptyParameter(),
      hag_cement_mill_washed_coal: createEmptyParameter(),
      hag_cement_mill_australian_coal: createEmptyParameter(),
      hag_cement_mill_carbonaceous_shale: createEmptyParameter(),
      hag_cement_mill_lignite: createEmptyParameter(),
      hag_cement_mill_heavy_fuel_oil: createEmptyParameter(),
      hag_cement_mill_diesel_oil: createEmptyParameter(),
      // HAG Cement Mill Alternative Fuel Consumption
      hag_cement_mill_spent_carbon: createEmptyParameter(),
      hag_cement_mill_carbon_black: createEmptyParameter(),
      hag_cement_mill_shredded_plastic: createEmptyParameter(),
      hag_cement_mill_refused_derived_fuels: createEmptyParameter(),
      hag_cement_mill_organic_residue: createEmptyParameter(),
      hag_cement_mill_organic_liquid_solvents: createEmptyParameter(),
      hag_cement_mill_dolochar: createEmptyParameter(),
      hag_cement_mill_spent_coffee: createEmptyParameter(),
      hag_cement_mill_ppf_oil: createEmptyParameter(),
      hag_cement_mill_sewage_sludge: createEmptyParameter(),
      hag_cement_mill_wood_non_impregnated_saw_dust: createEmptyParameter(),
      hag_cement_mill_paper_carton: createEmptyParameter(),
      hag_cement_mill_animal_meal: createEmptyParameter(),
      hag_cement_mill_animal_bone_meal: createEmptyParameter(),
      hag_cement_mill_animal_fat: createEmptyParameter(),
      hag_cement_mill_agricultural_organic_diaper_waste_charcoal: createEmptyParameter(),
      hag_cement_mill_other_biomass: createEmptyParameter(),
      hag_cement_mill_rice_husk: createEmptyParameter(),
      hag_cement_mill_biomass_content_from_alternate_fuels: createEmptyParameter(),
      // HAG Cement Mill Calorific Values
      hag_cement_mill_rb1_imported_coal_calorific_value: createEmptyParameter(),
      hag_cement_mill_rb2_imported_coal_calorific_value: createEmptyParameter(),
      hag_cement_mill_rb3_imported_coal_calorific_value: createEmptyParameter(),
      hag_cement_mill_indigenous_pet_coke_calorific_value: createEmptyParameter(),
      hag_cement_mill_imported_petcoke_hm_trading_calorific_value: createEmptyParameter(),
      hag_cement_mill_imported_petcoke_hc_saudi_calorific_value: createEmptyParameter(),
      hag_cement_mill_us_petcoke_calorific_value: createEmptyParameter(),
      hag_cement_mill_indian_coal_calorific_value: createEmptyParameter(),
      hag_cement_mill_us_coal_ncv_6900_calorific_value: createEmptyParameter(),
      hag_cement_mill_us_coal_ncv_6250_calorific_value: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g5_calorific_value: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g6_calorific_value: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g7_calorific_value: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g8_calorific_value: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g11_calorific_value: createEmptyParameter(),
      hag_cement_mill_indigenous_coal_g13_calorific_value: createEmptyParameter(),
      hag_cement_mill_washed_coal_calorific_value: createEmptyParameter(),
      hag_cement_mill_australian_coal_calorific_value: createEmptyParameter(),
      hag_cement_mill_carbonaceous_shale_calorific_value: createEmptyParameter(),
      hag_cement_mill_lignite_calorific_value: createEmptyParameter(),
      hag_cement_mill_heavy_fuel_oil_calorific_value: createEmptyParameter(),
      hag_cement_mill_diesel_oil_calorific_value: createEmptyParameter(),
      hag_cement_mill_spent_carbon_calorific_value: createEmptyParameter(),
      hag_cement_mill_carbon_black_calorific_value: createEmptyParameter(),
      hag_cement_mill_shredded_plastic_calorific_value: createEmptyParameter(),
      hag_cement_mill_refused_derived_fuels_calorific_value: createEmptyParameter(),
      hag_cement_mill_organic_residue_calorific_value: createEmptyParameter(),
      hag_cement_mill_organic_liquid_solvents_calorific_value: createEmptyParameter(),
      hag_cement_mill_dolochar_calorific_value: createEmptyParameter(),
      hag_cement_mill_spent_coffee_calorific_value: createEmptyParameter(),
      hag_cement_mill_ppf_oil_calorific_value: createEmptyParameter(),
      hag_cement_mill_sewage_sludge_calorific_value: createEmptyParameter(),
      hag_cement_mill_wood_non_impregnated_saw_dust_calorific_value: createEmptyParameter(),
      hag_cement_mill_paper_carton_calorific_value: createEmptyParameter(),
      hag_cement_mill_animal_meal_calorific_value: createEmptyParameter(),
      hag_cement_mill_animal_bone_meal_calorific_value: createEmptyParameter(),
      hag_cement_mill_animal_fat_calorific_value: createEmptyParameter(),
      hag_cement_mill_agricultural_organic_diaper_waste_charcoal_calorific_value: createEmptyParameter(),
      hag_cement_mill_other_biomass_calorific_value: createEmptyParameter(),
      hag_cement_mill_rice_husk_calorific_value: createEmptyParameter(),
      hag_cement_mill_biomass_content_from_alternate_fuels_calorific_value: createEmptyParameter()
    }
  }
};

export const ManualEntry: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('cement-production-form-draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Check if the saved data has the new structure
        if (parsed.production && parsed.energy_data && parsed.emissions_data && parsed.fuel_data) {
          return parsed;
        } else {
          // Old data structure, clear it and use initial data
          localStorage.removeItem('cement-production-form-draft');
          return initialFormData;
        }
      } catch (error) {
        // Invalid JSON, use initial data
        localStorage.removeItem('cement-production-form-draft');
        return initialFormData;
      }
    }
    return initialFormData;
  });
  const [activeSection, setActiveSection] = useState<'production' | 'energy_data' | 'emissions_data' | 'fuel_data'>('production');
  const [activeFuelSubsection, setActiveFuelSubsection] = useState<'kiln' | 'cpp' | 'hag_cement_mill'>('kiln');
  const [savedSections, setSavedSections] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (section: keyof FormData, field: string, dataType: 'value' | 'month' | 'year', value: string, subsection?: string) => {
    if (section === 'fuel_data' && subsection) {
      // Handle nested fuel data structure
      const fuelSubsection = formData.fuel_data[subsection as keyof typeof formData.fuel_data];
      const currentParam = (fuelSubsection as any)[field] as ParameterData;
      const updatedData = {
        ...formData,
        fuel_data: {
          ...formData.fuel_data,
          [subsection]: {
            ...(formData.fuel_data[subsection as keyof typeof formData.fuel_data] as any),
            [field]: {
              ...currentParam,
              [dataType]: value
            }
          }
        }
      };
      setFormData(updatedData);
      localStorage.setItem('cement-production-form-draft', JSON.stringify(updatedData));
    } else {
      // Handle regular sections
      const currentParam = formData[section][field as keyof typeof formData[typeof section]] as ParameterData;
      const updatedData = {
        ...formData,
        [section]: {
          ...formData[section],
          [field]: {
            ...currentParam,
            [dataType]: value
          }
        }
      };
      setFormData(updatedData);
      localStorage.setItem('cement-production-form-draft', JSON.stringify(updatedData));
    }
  };

  const handleSectionSave = (section: keyof FormData) => {
    setSavedSections(prev => new Set(prev).add(section));
    // In a real app, this would save to backend
    console.log(`Saved ${section} section:`, formData[section]);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSavedSections(new Set());
    localStorage.removeItem('cement-production-form-draft');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Submitted ESG data:', formData);
    setSavedSections(new Set(['production', 'energy_data', 'emissions_data', 'fuel_data']));
    localStorage.removeItem('cement-production-form-draft');
    setIsSubmitting(false);
  };

  const sections = [
    { 
      key: 'production' as const, 
      label: 'Production',
      fields: [
        { key: 'clinker_production', label: 'clinker_production', type: 'number', unit: 't' },
        { key: 'clinker_consumption', label: 'clinker_consumption', type: 'number', unit: 't' },
        { key: 'clinker_export', label: 'clinker_export', type: 'number', unit: 't' },
        { key: 'clinker_import', label: 'clinker_import', type: 'number', unit: 't' },
        { key: 'rawmeal_production', label: 'rawmeal_production', type: 'number', unit: 't' },
        { key: 'natural_gypsum_consumed', label: 'natural_gypsum_consumed', type: 'number', unit: 't' },
        { key: 'limestone_consumed_as_raw_material', label: 'limestone_consumed_as_raw_material', type: 'number', unit: 't' },
        { key: 'total_cement_dispatched', label: 'total_cement_dispatched', type: 'number', unit: 't' },
        { key: 'total_opc_produced', label: 'total_opc_produced', type: 'number', unit: 't' },
        { key: 'total_ppc_produced', label: 'total_ppc_produced', type: 'number', unit: 't' },
        { key: 'total_psc_produced', label: 'total_psc_produced', type: 'number', unit: 't' },
        { key: 'total_cc_produced', label: 'total_cc_produced', type: 'number', unit: 't' },
        { key: 'total_ipc_produced', label: 'total_ipc_produced', type: 'number', unit: 't' },
        { key: 'total_super_ppc_produced', label: 'total_super_ppc_produced', type: 'number', unit: 't' },
        { key: 'total_ggbs_produced', label: 'total_ggbs_produced', type: 'number', unit: 't' },
        { key: 'total_super_opc_produced', label: 'total_super_opc_produced', type: 'number', unit: 't' },
        { key: 'kiln_operating_hours', label: 'kiln_operating_hours', type: 'number', unit: 'h' },
        { key: 'kiln_feed_rate', label: 'kiln_feed_rate', type: 'number', unit: 't h⁻¹' }
      ]
    },
    { 
      key: 'energy_data' as const, 
      label: 'Energy Data',
      fields: [
        { key: 'total_power_generation_onsite_power_plant', label: 'total_power_generation_onsite_power_plant', type: 'number', unit: 'MWh' },
        { key: 'power_delivered_cement_plant_onsite', label: 'power_delivered_cement_plant_onsite', type: 'number', unit: 'MWh' },
        { key: 'total_power_generation_whrs_power_plant', label: 'total_power_generation_whrs_power_plant', type: 'number', unit: 'MWh' },
        { key: 'power_delivered_cement_plant_whrs', label: 'power_delivered_cement_plant_whrs', type: 'number', unit: 'MWh' },
        { key: 'total_power_generation_solar_power_plant', label: 'total_power_generation_solar_power_plant', type: 'number', unit: 'MWh' },
        { key: 'power_delivered_cement_plant_solar', label: 'power_delivered_cement_plant_solar', type: 'number', unit: 'MWh' },
        { key: 'power_delivered_cement_plant_hydel', label: 'power_delivered_cement_plant_hydel', type: 'number', unit: 'MWh' },
        { key: 'total_grid_power_consumed', label: 'total_grid_power_consumed', type: 'number', unit: 'MWh' },
        { key: 'power_delivered_cement_plant_grid', label: 'power_delivered_cement_plant_grid', type: 'number', unit: 'MWh' },
        { key: 'dg_power_consumption', label: 'dg_power_consumption', type: 'number', unit: 'MWh' },
        { key: 'onsite_power_generation_export_to_grid', label: 'onsite_power_generation_export_to_grid', type: 'number', unit: 'MWh' },
        { key: 'total_power_consumption_up_to_clinker_production', label: 'total_power_consumption_up_to_clinker_production', type: 'number', unit: 'MWh' },
        { key: 'ls_crusher_power_consumption', label: 'ls_crusher_power_consumption', type: 'number', unit: 'kWh' },
        { key: 'raw_mill_power_consumption', label: 'raw_mill_power_consumption', type: 'number', unit: 'kWh' },
        { key: 'pyro_power_consumption', label: 'pyro_power_consumption', type: 'number', unit: 'kWh' },
        { key: 'coal_mill_power_consumption', label: 'coal_mill_power_consumption', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_cement_grinding', label: 'power_consumption_cement_grinding', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_cement_packing', label: 'power_consumption_cement_packing', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_utilities_others', label: 'power_consumption_utilities_others', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_opc', label: 'power_consumption_opc', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_ppc', label: 'power_consumption_ppc', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_psc', label: 'power_consumption_psc', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_cc', label: 'power_consumption_cc', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_ipc', label: 'power_consumption_ipc', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_super_ppc', label: 'power_consumption_super_ppc', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_ggbs', label: 'power_consumption_ggbs', type: 'number', unit: 'kWh' },
        { key: 'power_consumption_super_opc', label: 'power_consumption_super_opc', type: 'number', unit: 'kWh' }
      ]
    },
    { 
      key: 'emissions_data' as const, 
      label: 'Emissions Data',
      fields: [
        { key: 'clinker_cao_including_freelime', label: 'clinker_cao_including_freelime', type: 'number', unit: '%' },
        { key: 'clinker_mgo', label: 'clinker_mgo', type: 'number', unit: '%' },
        { key: 'imported_coal_ash_content', label: 'imported_coal_ash_content', type: 'number', unit: '%' },
        { key: 'indigenous_coal_ash_content', label: 'indigenous_coal_ash_content', type: 'number', unit: '%' },
        { key: 'lignite_ash_content', label: 'lignite_ash_content', type: 'number', unit: '%' },
        { key: 'pet_coke_ash_content', label: 'pet_coke_ash_content', type: 'number', unit: '%' },
        { key: 'rice_husk_ash_content', label: 'rice_husk_ash_content', type: 'number', unit: '%' },
        { key: 'tyres_spent_carbon_ash_content', label: 'tyres_spent_carbon_ash_content', type: 'number', unit: '%' },
        { key: 'coal_ash_cao', label: 'coal_ash_cao', type: 'number', unit: '%' },
        { key: 'coal_ash_mgo', label: 'coal_ash_mgo', type: 'number', unit: '%' }
      ]
    },
    { 
      key: 'fuel_data' as const, 
      label: 'Fuel Data',
      subsections: {
        kiln: {
          label: 'Kiln',
          fields: [
            // Kiln Base Fuel Consumption
            { key: 'rb1_imported_coal', label: 'rb1_imported_coal', type: 'number', unit: 't' },
            { key: 'rb2_imported_coal', label: 'rb2_imported_coal', type: 'number', unit: 't' },
            { key: 'rb3_imported_coal', label: 'rb3_imported_coal', type: 'number', unit: 't' },
            { key: 'indigenous_pet_coke', label: 'indigenous_pet_coke', type: 'number', unit: 't' },
            { key: 'imported_petcoke_hm_trading', label: 'imported_petcoke_hm_trading', type: 'number', unit: 't' },
            { key: 'imported_petcoke_hc_saudi', label: 'imported_petcoke_hc_saudi', type: 'number', unit: 't' },
            { key: 'us_petcoke', label: 'us_petcoke', type: 'number', unit: 't' },
            { key: 'indian_coal', label: 'indian_coal', type: 'number', unit: 't' },
            { key: 'us_coal_ncv_6900', label: 'us_coal_ncv_6900', type: 'number', unit: 't' },
            { key: 'us_coal_ncv_6250', label: 'us_coal_ncv_6250', type: 'number', unit: 't' },
            { key: 'indigenous_coal_g5', label: 'indigenous_coal_g5', type: 'number', unit: 't' },
            { key: 'indigenous_coal_g6', label: 'indigenous_coal_g6', type: 'number', unit: 't' },
            { key: 'indigenous_coal_g7', label: 'indigenous_coal_g7', type: 'number', unit: 't' },
            { key: 'indigenous_coal_g8', label: 'indigenous_coal_g8', type: 'number', unit: 't' },
            { key: 'indigenous_coal_g11', label: 'indigenous_coal_g11', type: 'number', unit: 't' },
            { key: 'indigenous_coal_g13', label: 'indigenous_coal_g13', type: 'number', unit: 't' },
            { key: 'washed_coal', label: 'washed_coal', type: 'number', unit: 't' },
            { key: 'australian_coal', label: 'australian_coal', type: 'number', unit: 't' },
            { key: 'carbonaceous_shale', label: 'carbonaceous_shale', type: 'number', unit: 't' },
            { key: 'lignite', label: 'lignite', type: 'number', unit: 't' },
            { key: 'heavy_fuel_oil', label: 'heavy_fuel_oil', type: 'number', unit: 'kl' },
            { key: 'diesel_oil', label: 'diesel_oil', type: 'number', unit: 'kl' },
            // Kiln Alternative Fuel Consumption
            { key: 'spent_carbon', label: 'spent_carbon', type: 'number', unit: 't' },
            { key: 'carbon_black', label: 'carbon_black', type: 'number', unit: 't' },
            { key: 'shredded_plastic', label: 'shredded_plastic', type: 'number', unit: 't' },
            { key: 'refused_derived_fuels', label: 'refused_derived_fuels', type: 'number', unit: 't' },
            { key: 'organic_residue', label: 'organic_residue', type: 'number', unit: 't' },
            { key: 'organic_liquid_solvents', label: 'organic_liquid_solvents', type: 'number', unit: 't' },
            { key: 'dolochar', label: 'dolochar', type: 'number', unit: 't' },
            { key: 'spent_coffee', label: 'spent_coffee', type: 'number', unit: 't' },
            { key: 'ppf_oil_kiln_light_up', label: 'ppf_oil_kiln_light_up', type: 'number', unit: 't' },
            { key: 'sewage_sludge', label: 'sewage_sludge', type: 'number', unit: 't' },
            { key: 'wood_non_impregnated_saw_dust', label: 'wood_non_impregnated_saw_dust', type: 'number', unit: 't' },
            { key: 'paper_carton', label: 'paper_carton', type: 'number', unit: 't' },
            { key: 'animal_meal', label: 'animal_meal', type: 'number', unit: 't' },
            { key: 'animal_bone_meal', label: 'animal_bone_meal', type: 'number', unit: 't' },
            { key: 'animal_fat', label: 'animal_fat', type: 'number', unit: 't' },
            { key: 'agricultural_organic_diaper_waste_charcoal', label: 'agricultural_organic_diaper_waste_charcoal', type: 'number', unit: 't' },
            { key: 'other_biomass', label: 'other_biomass', type: 'number', unit: 't' },
            { key: 'rice_husk', label: 'rice_husk', type: 'number', unit: 't' },
            { key: 'biomass_content_from_alternate_fuels', label: 'biomass_content_from_alternate_fuels', type: 'number', unit: 't' },
            // Kiln Calorific Values
            { key: 'rb1_imported_coal_calorific_value', label: 'rb1_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'rb2_imported_coal_calorific_value', label: 'rb2_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'rb3_imported_coal_calorific_value', label: 'rb3_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indigenous_pet_coke_calorific_value', label: 'indigenous_pet_coke_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'imported_petcoke_hm_trading_calorific_value', label: 'imported_petcoke_hm_trading_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'imported_petcoke_hc_saudi_calorific_value', label: 'imported_petcoke_hc_saudi_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'us_petcoke_calorific_value', label: 'us_petcoke_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indian_coal_calorific_value', label: 'indian_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'us_coal_ncv_6900_calorific_value', label: 'us_coal_ncv_6900_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'us_coal_ncv_6250_calorific_value', label: 'us_coal_ncv_6250_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indigenous_coal_g5_calorific_value', label: 'indigenous_coal_g5_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indigenous_coal_g6_calorific_value', label: 'indigenous_coal_g6_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indigenous_coal_g7_calorific_value', label: 'indigenous_coal_g7_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indigenous_coal_g8_calorific_value', label: 'indigenous_coal_g8_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indigenous_coal_g11_calorific_value', label: 'indigenous_coal_g11_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'indigenous_coal_g13_calorific_value', label: 'indigenous_coal_g13_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'washed_coal_calorific_value', label: 'washed_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'australian_coal_calorific_value', label: 'australian_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'carbonaceous_shale_calorific_value', label: 'carbonaceous_shale_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'lignite_calorific_value', label: 'lignite_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'heavy_fuel_oil_calorific_value', label: 'heavy_fuel_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'diesel_oil_calorific_value', label: 'diesel_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'spent_carbon_calorific_value', label: 'spent_carbon_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'carbon_black_calorific_value', label: 'carbon_black_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'shredded_plastic_calorific_value', label: 'shredded_plastic_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'refused_derived_fuels_calorific_value', label: 'refused_derived_fuels_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'organic_residue_calorific_value', label: 'organic_residue_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'organic_liquid_solvents_calorific_value', label: 'organic_liquid_solvents_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'dolochar_calorific_value', label: 'dolochar_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'spent_coffee_calorific_value', label: 'spent_coffee_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'ppf_oil_calorific_value', label: 'ppf_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'sewage_sludge_calorific_value', label: 'sewage_sludge_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'wood_non_impregnated_saw_dust_calorific_value', label: 'wood_non_impregnated_saw_dust_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'paper_carton_calorific_value', label: 'paper_carton_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'animal_meal_calorific_value', label: 'animal_meal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'animal_bone_meal_calorific_value', label: 'animal_bone_meal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'animal_fat_calorific_value', label: 'animal_fat_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'agricultural_organic_diaper_waste_charcoal_calorific_value', label: 'agricultural_organic_diaper_waste_charcoal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'other_biomass_calorific_value', label: 'other_biomass_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'rice_husk_calorific_value', label: 'rice_husk_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'biomass_content_from_alternate_fuels_calorific_value', label: 'biomass_content_from_alternate_fuels_calorific_value', type: 'number', unit: 'kcal/kg' }
          ]
        },
        cpp: {
          label: 'CPP',
          fields: [
            // CPP Base Fuel Consumption
            { key: 'cpp_rb1_imported_coal', label: 'cpp_rb1_imported_coal', type: 'number', unit: 't' },
            { key: 'cpp_rb2_imported_coal', label: 'cpp_rb2_imported_coal', type: 'number', unit: 't' },
            { key: 'cpp_rb3_imported_coal', label: 'cpp_rb3_imported_coal', type: 'number', unit: 't' },
            { key: 'cpp_indigenous_pet_coke', label: 'cpp_indigenous_pet_coke', type: 'number', unit: 't' },
            { key: 'cpp_imported_petcoke_hm_trading', label: 'cpp_imported_petcoke_hm_trading', type: 'number', unit: 't' },
            { key: 'cpp_imported_petcoke_hc_saudi', label: 'cpp_imported_petcoke_hc_saudi', type: 'number', unit: 't' },
            { key: 'cpp_us_petcoke', label: 'cpp_us_petcoke', type: 'number', unit: 't' },
            { key: 'cpp_indian_coal', label: 'cpp_indian_coal', type: 'number', unit: 't' },
            { key: 'cpp_us_coal_ncv_6900', label: 'cpp_us_coal_ncv_6900', type: 'number', unit: 't' },
            { key: 'cpp_us_coal_ncv_6250', label: 'cpp_us_coal_ncv_6250', type: 'number', unit: 't' },
            { key: 'cpp_indigenous_coal_g5', label: 'cpp_indigenous_coal_g5', type: 'number', unit: 't' },
            { key: 'cpp_indigenous_coal_g6', label: 'cpp_indigenous_coal_g6', type: 'number', unit: 't' },
            { key: 'cpp_indigenous_coal_g7', label: 'cpp_indigenous_coal_g7', type: 'number', unit: 't' },
            { key: 'cpp_indigenous_coal_g8', label: 'cpp_indigenous_coal_g8', type: 'number', unit: 't' },
            { key: 'cpp_indigenous_coal_g11', label: 'cpp_indigenous_coal_g11', type: 'number', unit: 't' },
            { key: 'cpp_indigenous_coal_g13', label: 'cpp_indigenous_coal_g13', type: 'number', unit: 't' },
            { key: 'cpp_washed_coal', label: 'cpp_washed_coal', type: 'number', unit: 't' },
            { key: 'cpp_australian_coal', label: 'cpp_australian_coal', type: 'number', unit: 't' },
            { key: 'cpp_carbonaceous_shale', label: 'cpp_carbonaceous_shale', type: 'number', unit: 't' },
            { key: 'cpp_lignite', label: 'cpp_lignite', type: 'number', unit: 't' },
            { key: 'cpp_heavy_fuel_oil', label: 'cpp_heavy_fuel_oil', type: 'number', unit: 'kl' },
            { key: 'cpp_diesel_oil', label: 'cpp_diesel_oil', type: 'number', unit: 'kl' },
            // CPP Alternative Fuel Consumption
            { key: 'cpp_spent_carbon', label: 'cpp_spent_carbon', type: 'number', unit: 't' },
            { key: 'cpp_carbon_black', label: 'cpp_carbon_black', type: 'number', unit: 't' },
            { key: 'cpp_shredded_plastic', label: 'cpp_shredded_plastic', type: 'number', unit: 't' },
            { key: 'cpp_refused_derived_fuels', label: 'cpp_refused_derived_fuels', type: 'number', unit: 't' },
            { key: 'cpp_organic_residue', label: 'cpp_organic_residue', type: 'number', unit: 't' },
            { key: 'cpp_organic_liquid_solvents', label: 'cpp_organic_liquid_solvents', type: 'number', unit: 't' },
            { key: 'cpp_dolochar', label: 'cpp_dolochar', type: 'number', unit: 't' },
            { key: 'cpp_spent_coffee', label: 'cpp_spent_coffee', type: 'number', unit: 't' },
            { key: 'cpp_ppf_oil', label: 'cpp_ppf_oil', type: 'number', unit: 't' },
            { key: 'cpp_sewage_sludge', label: 'cpp_sewage_sludge', type: 'number', unit: 't' },
            { key: 'cpp_wood_non_impregnated_saw_dust', label: 'cpp_wood_non_impregnated_saw_dust', type: 'number', unit: 't' },
            { key: 'cpp_paper_carton', label: 'cpp_paper_carton', type: 'number', unit: 't' },
            { key: 'cpp_animal_meal', label: 'cpp_animal_meal', type: 'number', unit: 't' },
            { key: 'cpp_animal_bone_meal', label: 'cpp_animal_bone_meal', type: 'number', unit: 't' },
            { key: 'cpp_animal_fat', label: 'cpp_animal_fat', type: 'number', unit: 't' },
            { key: 'cpp_agricultural_organic_diaper_waste_charcoal', label: 'cpp_agricultural_organic_diaper_waste_charcoal', type: 'number', unit: 't' },
            { key: 'cpp_other_biomass', label: 'cpp_other_biomass', type: 'number', unit: 't' },
            { key: 'cpp_rice_husk', label: 'cpp_rice_husk', type: 'number', unit: 't' },
            { key: 'cpp_biomass_content_from_alternate_fuels', label: 'cpp_biomass_content_from_alternate_fuels', type: 'number', unit: 't' },
            // CPP Calorific Values
            { key: 'cpp_rb1_imported_coal_calorific_value', label: 'cpp_rb1_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_rb2_imported_coal_calorific_value', label: 'cpp_rb2_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_rb3_imported_coal_calorific_value', label: 'cpp_rb3_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indigenous_pet_coke_calorific_value', label: 'cpp_indigenous_pet_coke_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_imported_petcoke_hm_trading_calorific_value', label: 'cpp_imported_petcoke_hm_trading_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_imported_petcoke_hc_saudi_calorific_value', label: 'cpp_imported_petcoke_hc_saudi_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_us_petcoke_calorific_value', label: 'cpp_us_petcoke_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indian_coal_calorific_value', label: 'cpp_indian_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_us_coal_ncv_6900_calorific_value', label: 'cpp_us_coal_ncv_6900_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_us_coal_ncv_6250_calorific_value', label: 'cpp_us_coal_ncv_6250_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indigenous_coal_g5_calorific_value', label: 'cpp_indigenous_coal_g5_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indigenous_coal_g6_calorific_value', label: 'cpp_indigenous_coal_g6_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indigenous_coal_g7_calorific_value', label: 'cpp_indigenous_coal_g7_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indigenous_coal_g8_calorific_value', label: 'cpp_indigenous_coal_g8_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indigenous_coal_g11_calorific_value', label: 'cpp_indigenous_coal_g11_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_indigenous_coal_g13_calorific_value', label: 'cpp_indigenous_coal_g13_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_washed_coal_calorific_value', label: 'cpp_washed_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_australian_coal_calorific_value', label: 'cpp_australian_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_carbonaceous_shale_calorific_value', label: 'cpp_carbonaceous_shale_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_lignite_calorific_value', label: 'cpp_lignite_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_heavy_fuel_oil_calorific_value', label: 'cpp_heavy_fuel_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_diesel_oil_calorific_value', label: 'cpp_diesel_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_spent_carbon_calorific_value', label: 'cpp_spent_carbon_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_carbon_black_calorific_value', label: 'cpp_carbon_black_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_shredded_plastic_calorific_value', label: 'cpp_shredded_plastic_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_refused_derived_fuels_calorific_value', label: 'cpp_refused_derived_fuels_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_organic_residue_calorific_value', label: 'cpp_organic_residue_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_organic_liquid_solvents_calorific_value', label: 'cpp_organic_liquid_solvents_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_dolochar_calorific_value', label: 'cpp_dolochar_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_spent_coffee_calorific_value', label: 'cpp_spent_coffee_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_ppf_oil_calorific_value', label: 'cpp_ppf_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_sewage_sludge_calorific_value', label: 'cpp_sewage_sludge_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_wood_non_impregnated_saw_dust_calorific_value', label: 'cpp_wood_non_impregnated_saw_dust_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_paper_carton_calorific_value', label: 'cpp_paper_carton_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_animal_meal_calorific_value', label: 'cpp_animal_meal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_animal_bone_meal_calorific_value', label: 'cpp_animal_bone_meal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_animal_fat_calorific_value', label: 'cpp_animal_fat_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_agricultural_organic_diaper_waste_charcoal_calorific_value', label: 'cpp_agricultural_organic_diaper_waste_charcoal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_other_biomass_calorific_value', label: 'cpp_other_biomass_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_rice_husk_calorific_value', label: 'cpp_rice_husk_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'cpp_biomass_content_from_alternate_fuels_calorific_value', label: 'cpp_biomass_content_from_alternate_fuels_calorific_value', type: 'number', unit: 'kcal/kg' }
          ]
        },
        hag_cement_mill: {
          label: 'HAG Cement Mill',
          fields: [
            // HAG Cement Mill Base Fuel Consumption
            { key: 'hag_cement_mill_rb1_imported_coal', label: 'hag_cement_mill_rb1_imported_coal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_rb2_imported_coal', label: 'hag_cement_mill_rb2_imported_coal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_rb3_imported_coal', label: 'hag_cement_mill_rb3_imported_coal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indigenous_pet_coke', label: 'hag_cement_mill_indigenous_pet_coke', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_imported_petcoke_hm_trading', label: 'hag_cement_mill_imported_petcoke_hm_trading', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_imported_petcoke_hc_saudi', label: 'hag_cement_mill_imported_petcoke_hc_saudi', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_us_petcoke', label: 'hag_cement_mill_us_petcoke', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indian_coal', label: 'hag_cement_mill_indian_coal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_us_coal_ncv_6900', label: 'hag_cement_mill_us_coal_ncv_6900', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_us_coal_ncv_6250', label: 'hag_cement_mill_us_coal_ncv_6250', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indigenous_coal_g5', label: 'hag_cement_mill_indigenous_coal_g5', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indigenous_coal_g6', label: 'hag_cement_mill_indigenous_coal_g6', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indigenous_coal_g7', label: 'hag_cement_mill_indigenous_coal_g7', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indigenous_coal_g8', label: 'hag_cement_mill_indigenous_coal_g8', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indigenous_coal_g11', label: 'hag_cement_mill_indigenous_coal_g11', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_indigenous_coal_g13', label: 'hag_cement_mill_indigenous_coal_g13', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_washed_coal', label: 'hag_cement_mill_washed_coal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_australian_coal', label: 'hag_cement_mill_australian_coal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_carbonaceous_shale', label: 'hag_cement_mill_carbonaceous_shale', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_lignite', label: 'hag_cement_mill_lignite', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_heavy_fuel_oil', label: 'hag_cement_mill_heavy_fuel_oil', type: 'number', unit: 'kl' },
            { key: 'hag_cement_mill_diesel_oil', label: 'hag_cement_mill_diesel_oil', type: 'number', unit: 'kl' },
            // HAG Cement Mill Alternative Fuel Consumption
            { key: 'hag_cement_mill_spent_carbon', label: 'hag_cement_mill_spent_carbon', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_carbon_black', label: 'hag_cement_mill_carbon_black', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_shredded_plastic', label: 'hag_cement_mill_shredded_plastic', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_refused_derived_fuels', label: 'hag_cement_mill_refused_derived_fuels', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_organic_residue', label: 'hag_cement_mill_organic_residue', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_organic_liquid_solvents', label: 'hag_cement_mill_organic_liquid_solvents', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_dolochar', label: 'hag_cement_mill_dolochar', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_spent_coffee', label: 'hag_cement_mill_spent_coffee', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_ppf_oil', label: 'hag_cement_mill_ppf_oil', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_sewage_sludge', label: 'hag_cement_mill_sewage_sludge', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_wood_non_impregnated_saw_dust', label: 'hag_cement_mill_wood_non_impregnated_saw_dust', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_paper_carton', label: 'hag_cement_mill_paper_carton', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_animal_meal', label: 'hag_cement_mill_animal_meal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_animal_bone_meal', label: 'hag_cement_mill_animal_bone_meal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_animal_fat', label: 'hag_cement_mill_animal_fat', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_agricultural_organic_diaper_waste_charcoal', label: 'hag_cement_mill_agricultural_organic_diaper_waste_charcoal', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_other_biomass', label: 'hag_cement_mill_other_biomass', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_rice_husk', label: 'hag_cement_mill_rice_husk', type: 'number', unit: 't' },
            { key: 'hag_cement_mill_biomass_content_from_alternate_fuels', label: 'hag_cement_mill_biomass_content_from_alternate_fuels', type: 'number', unit: 't' },
            // HAG Cement Mill Calorific Values
            { key: 'hag_cement_mill_rb1_imported_coal_calorific_value', label: 'hag_cement_mill_rb1_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_rb2_imported_coal_calorific_value', label: 'hag_cement_mill_rb2_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_rb3_imported_coal_calorific_value', label: 'hag_cement_mill_rb3_imported_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indigenous_pet_coke_calorific_value', label: 'hag_cement_mill_indigenous_pet_coke_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_imported_petcoke_hm_trading_calorific_value', label: 'hag_cement_mill_imported_petcoke_hm_trading_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_imported_petcoke_hc_saudi_calorific_value', label: 'hag_cement_mill_imported_petcoke_hc_saudi_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_us_petcoke_calorific_value', label: 'hag_cement_mill_us_petcoke_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indian_coal_calorific_value', label: 'hag_cement_mill_indian_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_us_coal_ncv_6900_calorific_value', label: 'hag_cement_mill_us_coal_ncv_6900_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_us_coal_ncv_6250_calorific_value', label: 'hag_cement_mill_us_coal_ncv_6250_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indigenous_coal_g5_calorific_value', label: 'hag_cement_mill_indigenous_coal_g5_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indigenous_coal_g6_calorific_value', label: 'hag_cement_mill_indigenous_coal_g6_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indigenous_coal_g7_calorific_value', label: 'hag_cement_mill_indigenous_coal_g7_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indigenous_coal_g8_calorific_value', label: 'hag_cement_mill_indigenous_coal_g8_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indigenous_coal_g11_calorific_value', label: 'hag_cement_mill_indigenous_coal_g11_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_indigenous_coal_g13_calorific_value', label: 'hag_cement_mill_indigenous_coal_g13_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_washed_coal_calorific_value', label: 'hag_cement_mill_washed_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_australian_coal_calorific_value', label: 'hag_cement_mill_australian_coal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_carbonaceous_shale_calorific_value', label: 'hag_cement_mill_carbonaceous_shale_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_lignite_calorific_value', label: 'hag_cement_mill_lignite_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_heavy_fuel_oil_calorific_value', label: 'hag_cement_mill_heavy_fuel_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_diesel_oil_calorific_value', label: 'hag_cement_mill_diesel_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_spent_carbon_calorific_value', label: 'hag_cement_mill_spent_carbon_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_carbon_black_calorific_value', label: 'hag_cement_mill_carbon_black_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_shredded_plastic_calorific_value', label: 'hag_cement_mill_shredded_plastic_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_refused_derived_fuels_calorific_value', label: 'hag_cement_mill_refused_derived_fuels_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_organic_residue_calorific_value', label: 'hag_cement_mill_organic_residue_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_organic_liquid_solvents_calorific_value', label: 'hag_cement_mill_organic_liquid_solvents_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_dolochar_calorific_value', label: 'hag_cement_mill_dolochar_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_spent_coffee_calorific_value', label: 'hag_cement_mill_spent_coffee_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_ppf_oil_calorific_value', label: 'hag_cement_mill_ppf_oil_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_sewage_sludge_calorific_value', label: 'hag_cement_mill_sewage_sludge_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_wood_non_impregnated_saw_dust_calorific_value', label: 'hag_cement_mill_wood_non_impregnated_saw_dust_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_paper_carton_calorific_value', label: 'hag_cement_mill_paper_carton_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_animal_meal_calorific_value', label: 'hag_cement_mill_animal_meal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_animal_bone_meal_calorific_value', label: 'hag_cement_mill_animal_bone_meal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_animal_fat_calorific_value', label: 'hag_cement_mill_animal_fat_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_agricultural_organic_diaper_waste_charcoal_calorific_value', label: 'hag_cement_mill_agricultural_organic_diaper_waste_charcoal_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_other_biomass_calorific_value', label: 'hag_cement_mill_other_biomass_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_rice_husk_calorific_value', label: 'hag_cement_mill_rice_husk_calorific_value', type: 'number', unit: 'kcal/kg' },
            { key: 'hag_cement_mill_biomass_content_from_alternate_fuels_calorific_value', label: 'hag_cement_mill_biomass_content_from_alternate_fuels_calorific_value', type: 'number', unit: 'kcal/kg' }
          ]
        }
      }
    }
  ];

  const currentSection = sections.find(s => s.key === activeSection)!;
  
  // Get current fuel subsection for fuel_data section
  const getCurrentFields = () => {
    if (activeSection === 'fuel_data' && currentSection.subsections) {
      return currentSection.subsections[activeFuelSubsection].fields;
    }
    return currentSection.fields || [];
  };
  
  const currentFields = getCurrentFields();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-grid-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
          <h1 className="text-2xl font-semibold text-latspace-dark">Manual Cement Production Data Entry</h1>
          <div className="flex space-x-grid-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-grid-3 py-grid-2 border border-latspace-dark text-sm font-medium text-latspace-dark bg-white hover:bg-latspace-dark hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-grid" />
              Reset
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center px-grid-3 py-grid-2 border border-latspace-dark text-sm font-medium text-white bg-latspace-dark hover:bg-latspace-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-grid" />
              {isSubmitting ? 'Submitting...' : 'Submit All'}
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-grid-6 px-grid-4" aria-label="Tabs">
              {sections.map((section) => {
                const isSaved = savedSections.has(section.key);
                return (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`whitespace-nowrap py-grid-3 px-grid-2 border-b-2 font-semibold text-sm uppercase tracking-wider ${
                      activeSection === section.key
                        ? 'border-latspace-dark text-latspace-dark'
                        : 'border-transparent text-latspace-medium hover:text-latspace-dark'
                    }`}
                  >
                    {section.label}
                    {isSaved && <CheckCircle className="w-4 h-4 ml-grid text-latspace-dark" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-grid-4">
            <div className="border border-gray-200 p-grid-3 mb-grid-4 grid-pattern">
              <h2 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">
                {currentSection.label} Data
              </h2>
              <p className="text-sm text-latspace-medium mt-grid">
                Enter your facility's {currentSection.label.toLowerCase()} data for this reporting period.
              </p>
            </div>

            {/* Fuel Data Sub-navigation */}
            {activeSection === 'fuel_data' && currentSection.subsections && (
              <div className="mb-grid-6">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-grid-4" aria-label="Fuel subsections">
                    {Object.entries(currentSection.subsections).map(([key, subsection]) => (
                      <button
                        key={key}
                        onClick={() => setActiveFuelSubsection(key as typeof activeFuelSubsection)}
                        className={`whitespace-nowrap py-grid-2 px-grid-3 border-b-2 font-medium text-xs uppercase tracking-wider ${
                          activeFuelSubsection === key
                            ? 'border-latspace-dark text-latspace-dark'
                            : 'border-transparent text-latspace-medium hover:text-latspace-dark'
                        }`}
                      >
                        {subsection.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-grid-6">
              {currentFields.map((field) => {
                const paramData = activeSection === 'fuel_data' 
                  ? ((formData.fuel_data[activeFuelSubsection] as any)?.[field.key] as ParameterData) || createEmptyParameter()
                  : formData[activeSection]?.[field.key as keyof typeof formData[typeof activeSection]] as ParameterData || createEmptyParameter();
                
                return (
                  <div key={field.key} className="border border-gray-200 p-grid-4">
                    <label className="block text-sm font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wider">
                      {field.label}
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-3">
                      {/* Value Input */}
                      <div>
                        <label className="block text-xs text-latspace-medium mb-grid uppercase tracking-wider">
                          Value
                        </label>
                        <div className="relative">
                          <input
                            type={field.type}
                            value={paramData.value}
                            onChange={(e) => 
                              activeSection === 'fuel_data'
                                ? handleInputChange(activeSection, field.key, 'value', e.target.value, activeFuelSubsection)
                                : handleInputChange(activeSection, field.key, 'value', e.target.value)
                            }
                            className="w-full px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm"
                            placeholder="0.00"
                          />
                          {field.unit && (
                            <div className="absolute right-grid-2 top-1/2 transform -translate-y-1/2 text-latspace-medium text-xs font-mono">
                              {field.unit}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Month Selection */}
                      <div>
                        <label className="block text-xs text-latspace-medium mb-grid uppercase tracking-wider">
                          Reporting Month
                        </label>
                        <select
                          value={paramData.month}
                          onChange={(e) => 
                            activeSection === 'fuel_data'
                              ? handleInputChange(activeSection, field.key, 'month', e.target.value, activeFuelSubsection)
                              : handleInputChange(activeSection, field.key, 'month', e.target.value)
                          }
                          className="w-full px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm"
                        >
                          <option value="">Select Month</option>
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>

                      {/* Year Selection */}
                      <div>
                        <label className="block text-xs text-latspace-medium mb-grid uppercase tracking-wider">
                          Reporting Year
                        </label>
                        <select
                          value={paramData.year}
                          onChange={(e) => 
                            activeSection === 'fuel_data'
                              ? handleInputChange(activeSection, field.key, 'year', e.target.value, activeFuelSubsection)
                              : handleInputChange(activeSection, field.key, 'year', e.target.value)
                          }
                          className="w-full px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm"
                        >
                          <option value="">Select Year</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-grid-6 flex justify-between">
              <div className="text-xs text-latspace-medium">
                {savedSections.has(activeSection) ? (
                  <span className="flex items-center text-latspace-dark font-mono">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    SECTION SAVED
                  </span>
                ) : (
                  <span className="font-mono">CHANGES AUTO-SAVED AS DRAFTS</span>
                )}
              </div>
              <button
                onClick={() => handleSectionSave(activeSection)}
                className={`px-grid-4 py-grid-2 font-medium text-sm ${
                  savedSections.has(activeSection)
                    ? 'border border-latspace-dark text-latspace-dark'
                    : 'bg-latspace-dark text-white hover:bg-latspace-medium'
                }`}
              >
                {savedSections.has(activeSection) ? 'SAVED' : 'SAVE SECTION'}
              </button>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 p-grid-3">
          <h3 className="text-xs font-semibold text-latspace-dark mb-grid-2 uppercase tracking-wider">Data Entry Guidelines</h3>
          <ul className="text-xs text-latspace-medium space-y-grid font-mono">
            <li>• DATA IS AUTOMATICALLY SAVED AS YOU TYPE</li>
            <li>• SAVE EACH SECTION BEFORE MOVING TO NEXT</li>
            <li>• SUBMIT ALL SECTIONS TOGETHER WHEN COMPLETE</li>
            <li>• CONTACT ADMINISTRATOR FOR PRODUCTION DATA ASSISTANCE</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};