
## 1. derived_production_kpis

| S.No | Column | Type | Unit | Description |
| --- | --- | --- | --- | --- |
| 1 | facility_id | VARCHAR(36) | — | UUID / code of plant |
| 2 | reporting_year | INT | yyyy | Gregorian year |
| 3 | reporting_month | INT | 1–12 | Gregorian month |
| 4 | clinker_production | DECIMAL(12,2) | Tons | Total kiln clinker made (reference from Input Sheet) |
| 5 | clinker_consumed | DECIMAL(12,2) | Tons | Clinker fed to cement mill (reference from Input Sheet) |
| 6 | clinker_export | DECIMAL(12,2) | Tons | Clinker exported (reference from Input Sheet) |
| 7 | clinker_import | DECIMAL(12,2) | Tons | Clinker imported (reference from Input Sheet) |
| 8 | raw_meal_production | DECIMAL(12,2) | Tons | Calciner feed raw meal (reference from Input Sheet) |
| 9 | natural_gypsum_consumed | DECIMAL(12,2) | Tons | Natural gypsum consumed |
| 10 | alternative_cementitious_material | DECIMAL(12,2) | Tons | Alternative cementitious materials consumed |
| 11 | total_mineral_component_materials | DECIMAL(12,2) | Tons | Sum of raw meal and gypsum consumption |
| 12 | limestone_consumed | DECIMAL(12,2) | Tons | Limestone consumed as raw material |
| 13 | total_cementitious_produced | DECIMAL(12,2) | Tons | Sum of clinker production and alternative cementitious material |
| 14 | total_cement_produced | DECIMAL(12,2) | Tons | Sum of clinker consumed and alternative cementitious material |
| 15 | total_cement_dispatched | DECIMAL(12,2) | Tons | Total cement dispatched |
| 16 | total_opc_produced | DECIMAL(12,2) | Tons | Total OPC produced |
| 17 | total_ppc_produced | DECIMAL(12,2) | Tons | Total PPC produced |
| 18 | total_psc_produced | DECIMAL(12,2) | Tons | Total PSC produced |
| 19 | total_cc_produced | DECIMAL(12,2) | Tons | Total CC produced |
| 20 | total_ipc_produced | DECIMAL(12,2) | Tons | Total IPC produced |
| 21 | total_super_ppc_produced | DECIMAL(12,2) | Tons | Total Super PPC produced |
| 22 | total_ggbs_produced | DECIMAL(12,2) | Tons | Total GGBS produced |
| 23 | total_super_opc_produced | DECIMAL(12,2) | Tons | Total Super OPC produced |
| 24 | total_blended_cements | DECIMAL(12,2) | Tons | Sum of all blended cement types (PPC, PSC, CC, IPC, Super PPC, GGBS, Super OPC) |
| 25 | clinker_factor | DECIMAL(10,4) | % | Clinker consumed divided by total cementitious produced |
| 26 | clinker_production_ratio | DECIMAL(10,4) | % | Clinker production divided by limestone consumed |
| 27 | blended_cements_share | DECIMAL(10,4) | % | Total blended cements divided by total cement produced times 100 |

## 2. derived_energy_metrics

| S.No | Column | Type | Unit | Description |
| --- | --- | --- | --- | --- |
| 1 | facility_id | VARCHAR(36) | — | UUID / code of plant |
| 2 | reporting_year | INT | yyyy | Gregorian year |
| 3 | reporting_month | INT | 1–12 | Gregorian month |
| 4 | kiln_heat_fossil_fuels | DECIMAL(12,4) | TJ | Kiln heat consumption from fossil fuels |
| 5 | kiln_heat_alternate_fuels | DECIMAL(12,4) | TJ | Kiln heat consumption from Alternate fuels |
| 6 | kiln_heat_biomass | DECIMAL(12,4) | TJ | Kiln heat consumption from Biomass |
| 7 | total_kiln_heat_consumption | DECIMAL(12,4) | TJ | Total heat consumption of Kiln |
| 8 | hag_heat_fossil_fuels | DECIMAL(12,4) | TJ | HAG (Cement Mill) heat consumption from fossil fuels |
| 9 | hag_heat_alternate_fuels | DECIMAL(12,4) | TJ | HAG (Cement Mill) heat consumption from Alternate fuels |
| 10 | hag_heat_biomass | DECIMAL(12,4) | TJ | HAG (Cement Mill) heat consumption from Biomass |
| 11 | total_hag_heat_consumption | DECIMAL(12,4) | TJ | Total heat consumption of HAG (Cement Mill) |
| 12 | onsite_power_generation_tj | DECIMAL(12,4) | TJ | On-site Power generation |
| 13 | total_non_kiln_fuel_consumption | DECIMAL(12,4) | TJ | Total Non- kiln fuel consumption |
| 14 | tsr_alternative_fuel | DECIMAL(10,4) | % | TSR (Thermal Substitution Ratio) alternative fuel |
| 15 | tsr_biomass | DECIMAL(10,4) | % | TSR (Thermal Substitution Ratio) Biomass |
| 16 | tsr_total | DECIMAL(10,4) | % | TSR |
| 17 | specific_heat_consumption | DECIMAL(12,2) | Kcal/kg of clinker | Specific Heat Consumption |
| 18 | power_plant_heat_rate | DECIMAL(12,2) | Kcal/kwh Gross | Heat rate of Power plant |
| 19 | plant_load_factor | DECIMAL(10,4) | % | Plant Load Factor |
| 20 | total_power_generation_onsite | DECIMAL(12,2) | MWh | Total Power generation from On-site power plant |
| 21 | power_delivered_cement_plant_onsite | DECIMAL(12,2) | MWh | Power delivered to cement plant |
| 22 | power_consumed_by_power_plant | DECIMAL(10,4) | % | Power consumed by power plant equipment |
| 23 | total_power_generation_whrs | DECIMAL(12,2) | MWh | Total power generation from WHRS power plant |
| 24 | power_delivered_cement_plant_whrs | DECIMAL(12,2) | MWh | Power delivered to cement plant by WHRS |
| 25 | power_consumed_by_whrs | DECIMAL(10,4) | % | Power consumed by WHRS equipment |
| 26 | total_power_generation_solar | DECIMAL(12,2) | MWh | Total power generation from Solar power plant |
| 27 | power_delivered_cement_plant_solar | DECIMAL(12,2) | MWh | Power delivered to cement plant by Solar |
| 28 | power_consumed_by_solar | DECIMAL(10,4) | % | Power consumed by Solar equipment |
| 29 | power_delivered_cement_plant_hydel | DECIMAL(12,2) | MWh | Power delivered to cement plant by Hydel |
| 30 | total_grid_power_consumed | DECIMAL(12,2) | MWh | Total Grid Power consumed (Including import from SCL-R) |
| 31 | power_delivered_cement_plant_grid | DECIMAL(12,2) | MWh | Power delivered to cement plant from the grid |
| 32 | total_power_consumption_clinker_production | DECIMAL(12,2) | MWh | Total power consumption up to clinker production |
| 33 | total_cement_plant_power_consumption | DECIMAL(12,2) | MWh | Total cement plant power consumption from Cr to dispatch |
| 34 | specific_power_consumption_cementitious | DECIMAL(12,2) | KWH/t of cementitious | Specific power consumption for cementitious |
| 35 | power_consumption_clinker | DECIMAL(12,2) | kWh | Power consumption for Clinker |
| 36 | power_consumption_ls_crusher | DECIMAL(12,2) | kWh | LS crusher |
| 37 | power_consumption_raw_mill | DECIMAL(12,2) | kWh | Raw mill |
| 38 | power_consumption_pyro | DECIMAL(12,2) | kWh | Pyro |
| 39 | power_consumption_coal_mill | DECIMAL(12,2) | kWh | Coal mill |
| 40 | sec_clinkerization | DECIMAL(12,2) | KWH/t of clinker | Specific power consumption for Clinker (SEC upto Clinkerization) |
| 41 | sec_ls_crusher | DECIMAL(12,2) | KWH/t of clinker | LS crusher |
| 42 | sec_raw_mill | DECIMAL(12,2) | KWH/t of clinker | Raw mill |
| 43 | sec_pyro | DECIMAL(12,2) | KWH/t of clinker | Pyro |
| 44 | sec_coal_mill | DECIMAL(12,2) | KWH/t of clinker | Coal mill |
| 45 | power_consumption_cement_grinding_packing | DECIMAL(12,2) | kWh | Power consumption in cement grinding and packing |
| 46 | power_consumed_cement_grinding | DECIMAL(12,2) | kWh | Power consumed in cement grinding |
| 47 | power_consumed_cement_packing | DECIMAL(12,2) | kWh | Power consumed in cement packing |
| 48 | power_consumed_utilities_others | DECIMAL(12,2) | kWh | Power consumed in Utilities and others (Lightning in colony, Misc and Tr loss) |
| 49 | sec_cement_grinding_packing | DECIMAL(12,2) | KWH/t of Cement | SEC of cement grinding and packing |
| 50 | sec_cement_grinding | DECIMAL(12,2) | KWH/t of Cement | SEC of cement grinding |
| 51 | sec_cement_packing | DECIMAL(12,2) | KWH/t of Cement | SEC OF cement packing |
| 52 | sec_utilities_others | DECIMAL(12,2) | KWH/t of Cement | SEC of Utilities and others (Lightning in colony, Misc and Tr loss) |
| 53 | power_consumption_overall_cement | DECIMAL(12,2) | kWh | Power consumption for overall cement |
| 54 | power_consumption_opc | DECIMAL(12,2) | kWh | Power consumption for OPC |
| 55 | power_consumption_ppc | DECIMAL(12,2) | kWh | Power consumption for PPC |
| 56 | power_consumption_psc | DECIMAL(12,2) | kWh | Power consumption for PSC |
| 57 | power_consumption_cc | DECIMAL(12,2) | kWh | Power consumption for CC |
| 58 | power_consumption_ipc | DECIMAL(12,2) | kWh | Power consumption for IPC |
| 59 | power_consumption_super_ppc | DECIMAL(12,2) | kWh | Power consumption for super PPC |
| 60 | power_consumption_ggbs | DECIMAL(12,2) | kWh | Power consumption for GGBS |
| 61 | power_consumption_super_opc | DECIMAL(12,2) | kWh | Power consumption for Super OPC |
| 62 | specific_power_consumption_overall_cement | DECIMAL(12,2) | KWH/t of Cement | Specific power consumption for overall cement |
| 63 | sec_opc | DECIMAL(12,2) | KWH/t of Cement | SEC of OPC |
| 64 | sec_ppc | DECIMAL(12,2) | KWH/t of Cement | SEC of PPC |
| 65 | sec_psc | DECIMAL(12,2) | KWH/t of Cement | SEC of PSC |
| 66 | sec_cc | DECIMAL(12,2) | KWH/t of Cement | SEC of CC |
| 67 | sec_ipc | DECIMAL(12,2) | KWH/t of Cement | SEC of IPC |
| 68 | sec_super_ppc | DECIMAL(12,2) | KWH/t of Cement | SEC of Super PPC |
| 69 | sec_super_ggbs | DECIMAL(12,2) | KWH/t of Cement | SEC of Super GGBS |
| 70 | sec_super_opc | DECIMAL(12,2) | KWH/t of Cement | SEC of Super OPC |
| 71 | ratio_electrical_green_energy | DECIMAL(10,4) | % | Ratio of electrical green energy |
| 72 | ratio_renewable_energy | DECIMAL(10,4) | % | Ratio of Renewable energy |
| 73 | dg_power_consumption | DECIMAL(12,2) | MWH | DG power consumption |
| 74 | onsite_power_generation_export_grid | DECIMAL(12,2) | MWH | Onsite power generation export to grid |


## 3. emissions_summary

| S.No | Column | Type | Unit | Description |
| --- | --- | --- | --- | --- |
| 1 | facility_id | VARCHAR(36) | — | UUID / code of plant |
| 2 | reporting_year | INT | yyyy | Gregorian year |
| 3 | reporting_month | INT | 1–12 | Gregorian month |
| 4 | scope1_total | DECIMAL(12,2) | TCO2 | Total Scope 1 emissions |
| 5 | raw_meal_calcination | DECIMAL(12,2) | TCO2 | Raw meal calcination process emissions |
| 6 | gross_fuel_emission_kiln | DECIMAL(12,2) | TCO2 | Gross fuel emission (Kiln) |
| 7 | gross_fuel_emission_cpp | DECIMAL(12,2) | TCO2 | Gross fuel emission (CPP) |
| 8 | gross_fuel_emission_hag | DECIMAL(12,2) | TCO2 | Gross fuel emission cement mill (HAG) |
| 9 | internal_transport_emission | DECIMAL(12,2) | TCO2 | Internal transport (owned vehicle) emissions |
| 10 | other_sources_emission | DECIMAL(12,2) | TCO2 | Other sources emissions |
| 11 | kiln_gross_co2_inc_af_biomass | DECIMAL(12,2) | TCO2 | Kiln gross CO2 fuel emission including AF and biomass |
| 12 | kiln_co2_af_biomass | DECIMAL(12,2) | TCO2 | Kiln CO2 emissions from alternate fuels & biomass |
| 13 | kiln_net_co2_excl_af | DECIMAL(12,2) | TCO2 | Kiln net CO2 fuel emission excluding alternate fuel |
| 14 | kiln_net_co2_excl_af_biomass | DECIMAL(12,2) | TCO2 | Kiln net CO2 emissions excluding alternate fuel and biomass |
| 15 | kiln_co2_biomass_only | DECIMAL(12,2) | TCO2 | Kiln CO2 emissions from only biomass |
| 16 | kiln_net_co2_excl_biomass | DECIMAL(12,2) | TCO2 | Kiln net CO2 emissions excluding biomass |
| 17 | cpp_gross_co2_inc_af_biomass | DECIMAL(12,2) | TCO2 | CPP gross CO2 fuel emission including AF and biomass |
| 18 | cpp_co2_af_biomass | DECIMAL(12,2) | TCO2 | CPP CO2 emissions from alternate fuels & biomass |
| 19 | cpp_net_co2_excl_af | DECIMAL(12,2) | TCO2 | CPP net CO2 fuel emission excluding alternate fuel |
| 20 | cpp_net_co2_excl_af_biomass | DECIMAL(12,2) | TCO2 | CPP net CO2 emissions excluding alternate fuel and biomass |
| 21 | cpp_co2_biomass_only | DECIMAL(12,2) | TCO2 | CPP CO2 emissions from only biomass |
| 22 | cpp_net_co2_excl_biomass | DECIMAL(12,2) | TCO2 | CPP net CO2 emissions excluding biomass |
| 23 | hag_gross_co2_inc_af_biomass | DECIMAL(12,2) | TCO2 | HAG gross CO2 fuel emission including AF and biomass |
| 24 | hag_co2_af_biomass | DECIMAL(12,2) | TCO2 | HAG CO2 emissions from alternate fuels & biomass |
| 25 | hag_net_co2_excl_af | DECIMAL(12,2) | TCO2 | HAG net CO2 fuel emission excluding alternate fuel |
| 26 | hag_net_co2_excl_af_biomass | DECIMAL(12,2) | TCO2 | HAG net CO2 emissions excluding alternate fuel and biomass |
| 27 | hag_co2_biomass_only | DECIMAL(12,2) | TCO2 | HAG CO2 emissions from only biomass |
| 28 | hag_net_co2_excl_biomass | DECIMAL(12,2) | TCO2 | HAG net CO2 emissions excluding biomass |

## 4. consolidated_emissions

| S.No | Column | Type | Unit | Description |
| --- | --- | --- | --- | --- |
| 1 | facility_id | VARCHAR(36) | — | UUID / code of plant |
| 2 | reporting_year | INT | yyyy | Gregorian year |
| 3 | reporting_month | INT | 1–12 | Gregorian month |
| 4 | gross_co2_emissions | DECIMAL(12,2) | T CO2 | Gross CO2 emissions |
| 5 | co2_emissions_af_biomass | DECIMAL(12,2) | T CO2 | CO2 emissions from alternative fuels & biomass |
| 6 | net_co2_excl_af_biomass | DECIMAL(12,2) | T CO2 | Net CO2 emissions excluding AF and biomass |
| 7 | co2_emissions_biomass_only | DECIMAL(12,2) | T CO2 | CO2 emissions from only biomass |
| 8 | net_co2_excl_biomass | DECIMAL(12,2) | T CO2 | Net CO2 emissions excluding biomass |
| 9 | gross_co2_calcination | DECIMAL(12,2) | T CO2 | Gross CO2 emission from raw materials (calcination) |
| 10 | gross_co2_kiln_inc_af_biomass | DECIMAL(12,2) | T CO2 | Gross CO2 fuel emission including AF and biomass (Kiln) |
| 11 | net_co2_kiln_excl_af_biomass | DECIMAL(12,2) | T CO2 | Net CO2 fuel emission excluding AF and biomass (Kiln) |
| 12 | gross_co2_hag_inc_af_biomass | DECIMAL(12,2) | T CO2 | Gross CO2 fuel emission including AF and biomass (HAG) |
| 13 | net_co2_hag_excl_af_biomass | DECIMAL(12,2) | T CO2 | Net CO2 fuel emission excluding AF and biomass (HAG) |
| 14 | gross_co2_cpp_per_cementitious | DECIMAL(12,2) | T CO2 | Gross CO2 emission from power generation (CPP) / cementitious |
| 15 | gross_co2_internal_transport | DECIMAL(12,2) | T CO2 | Gross CO2 emission from internal transport and equipment |
| 16 | gross_co2_other_source | DECIMAL(12,2) | T CO2 | Gross CO2 emission from other source |
| 17 | scope2_absolute_co2 | DECIMAL(12,2) | T CO2 | Scope 2 absolute CO2 emission (purchased energy) |
| 18 | scope3_absolute_co2 | DECIMAL(12,2) | T CO2 | Scope 3 absolute CO2 emission (transportation of raw material receipts & dispatch of cement and clinker, employee commute) |
| 19 | specific_co2_rawmaterial_cementitious | DECIMAL(10,2) | kg CO2/t cementitious | Specific CO2 emission from raw material |
| 20 | specific_co2_kiln_inc_af_biomass_cementitious | DECIMAL(10,2) | kg CO2/t cementitious | Specific CO2 fuel emission including AF and biomass (Kiln) |
| 21 | specific_co2_hag_inc_af_biomass_cementitious | DECIMAL(10,2) | kg CO2/t cementitious | Specific CO2 fuel emission including AF and biomass (HAG) |
| 22 | specific_co2_cpp_cementitious | DECIMAL(10,2) | kg CO2/t cementitious | Specific CO2 emission from power generation (CPP) |
| 23 | specific_co2_internal_transport_cementitious | DECIMAL(10,2) | kg CO2/t cementitious | Specific CO2 emission from internal transportation |
| 24 | specific_co2_other_sources_cementitious | DECIMAL(10,2) | kg CO2/t cementitious | Specific CO2 emission from other sources |
| 25 | specific_co2_rawmaterial_clinker | DECIMAL(10,2) | kg CO2/t clinker | Specific CO2 emission from raw material |
| 26 | specific_co2_kiln_inc_af_biomass_clinker | DECIMAL(10,2) | kg CO2/t clinker | Specific CO2 fuel emission including AF and biomass (Kiln) |
| 27 | specific_co2_hag_inc_af_biomass_clinker | DECIMAL(10,2) | kg CO2/t clinker | Specific CO2 fuel emission including AF and biomass (HAG) |
| 28 | specific_co2_cpp_clinker | DECIMAL(10,2) | kg CO2/t clinker | Specific CO2 emission from power generation (CPP) |
| 29 | specific_co2_internal_transport_clinker | DECIMAL(10,2) | kg CO2/t clinker | Specific CO2 emission from internal transportation |
| 30 | specific_co2_other_sources_clinker | DECIMAL(10,2) | kg CO2/t clinker | Specific CO2 emission from other sources |
| 31 | gross_co2_intensity_clinker_scope2 | DECIMAL(10,2) | kg CO2/t clinker | Gross CO2 emission intensity per ton of clinker - scope 2 |
| 32 | gross_co2_intensity_clinker_scope3 | DECIMAL(10,2) | kg CO2/t clinker | Gross CO2 emission intensity per ton of clinker - scope 3 |
| 33 | total_gross_co2_intensity_clinker | DECIMAL(10,2) | kg CO2/t clinker | Total gross CO2 emission intensity per ton of clinker |
| 34 | emission_intensity_scope1 | DECIMAL(10,2) | kg CO2/t cementitious | Emission intensity - Scope 1 |
| 35 | emission_intensity_scope2 | DECIMAL(10,2) | kg CO2/t cementitious | Emission intensity - Scope 2 |
| 36 | emission_intensity_scope3 | DECIMAL(10,2) | kg CO2/t cementitious | Emission intensity - Scope 3 |
| 37 | emission_intensity_total | DECIMAL(10,2) | kg CO2/t cementitious | Total emission intensity |





## PRODUCTION ACTUAL DATA

PRODUCTION																
    Parameter	Units	April	May	June	July	August	September	October	November	December	January	February	March	YOD	2023-24
1	Clinker Production	Tons	 1,63,252 	 1,90,158 	 1,74,611 	 1,08,753 	 70,042 	 1,43,775 	 1,62,306 	 1,75,389 	 1,38,981 	 1,85,331 	166483	0	 16,79,081 	
2	Clinker Consumed	Tons	 1,03,502 	 81,255 	 1,10,023 	 86,796 	 96,231 	 72,637 	 91,703 	 95,995 	 1,19,840 	 1,14,382 	136580	0	 11,08,944 	
3	Clinker Export	Tons	 64,076 	 55,893 	 61,788 	 46,949 	 47,724 	 42,989 	 51,849 	 63,206 	 53,313 	 55,061 	53642.3	0	 5,96,490 	
4	Clinker Import	Tons	0	0	0	0	0	0	0	0	0	0	0	0	0	
5	Raw meal production	Tons	 2,47,935 	 2,84,270 	 2,69,490 	 1,71,585 	 1,04,145 	 2,23,540 	 2,45,425 	 2,65,065 	 2,11,075 	286045	248965	0	2557540	
6	Natural Gypsum Consumed 	Tons	0	0	50	39	314	667	825	460	218	0	0	0	2573	
7	Alternative Cementitious Material 	Tons	 26,473 	 20,835 	 25,859 	 21,245 	 20,005 	 17,691 	 22,342 	 23,060 	 27,297 	 27,548 	27930	0	 2,60,285 	
8	Total Mineral component materials consumed	Tons	 26,473 	 20,835 	 25,909 	 21,284 	 20,319 	 18,358 	 23,167 	 23,520 	 27,515 	 27,548 	27930	0	262858	
9	Limestone consumed as raw material	Tons	 2,37,572 	 2,68,563 	 2,55,400 	 1,62,772 	 98,117 	 2,05,298 	 2,27,367 	 2,48,087 	 1,96,403 	 2,65,215 	229692	0	 23,94,486 	
10	Total Cementitious Produced	Tons	 1,89,725 	 2,10,993 	 2,00,520 	 1,30,037 	 90,361 	 1,62,133 	 1,85,473 	 1,98,909 	 1,66,496 	 2,12,879 	194413	0	 19,41,939 	
11	Total Cement Produced	Tons	 1,29,975 	 1,02,090 	 1,35,932 	 1,08,080 	 1,16,550 	 90,995 	 1,14,870 	 1,19,515 	 1,47,355 	 1,41,930 	164510	0	 13,71,802 	
12	Total Cement Dispatched	Tons	 1,15,388 	 1,18,600 	 1,25,071 	 1,11,030 	 1,13,791 	 94,961 	 1,16,137 	117128	138182	148046	169345.05	0	 13,67,679 	
13	Total OPC Produced	Tons	 70,695 	 55,505 	 75,935 	 58,160 	 66,535 	 45,010 	 60,540 	 63,715 	 82,920 	 77,055 	102475	0	 7,58,545 	
14	Total PPC Produced	Tons	 59,280 	 46,585 	 54,938 	 45,717 	 47,209 	 42,552 	 50,617 	 51,380 	 57,644 	 61,263 	57434	0	 5,74,619 	
15	Total PSC Produced	Tons	0	0	0	0	0	0	0	0	0	0	0	0	0	
16	Total CC Produced	Tons	0	0	0	0	0	0	0	0	0	0	0	0	0	
17	Total IPC Produced	Tons	0	0	0	0	0	0	0	0	0	0	0	0	0	
18	Total Super PPC Produced	Tons	 -   	 -   	 5,059 	 4,203 	 2,806 	 3,433 	 3,713 	 4,420 	 6,791 	 3,612 	4601	0	 38,638 	
19	Total GGBS produced	Tons	0	0	0	0	0	0	0	0	0	0	0	0	0	
20	Total Super OPC Produced	Tons	0	0	0	0	0	0	0	0	0	0	0	0	0	
21	Total Blended Cements 	Tons	 59,280 	 46,585 	 59,997 	 49,920 	 50,015 	 45,985 	 54,330 	 55,800 	 64,435 	 64,875 	62035	0	 6,13,257 	
22	Clinker Factor	%	0.80	0.80	0.81	0.80	0.83	0.80	0.80	0.80	0.81	0.81	0.83	0.00	0.81	
23	Clinker Production Ratio	%	0.86	0.90	0.87	0.84	0.78	0.89	0.88	0.88	0.83	0.87	0.86	0.00	0.86	
24	Blended Cements share ( % of total cement produced)	%	46	46	44	46	43	51	47	47	44	46	38	0	45	


## ENERGY ACTUAL DATA

ENERGY																
S.No	Parameter	Units	April	May	June	July	August	September	October	November	December	January	February	March	YOD	2023-24
    FUEL															
1	Kiln heat consumption from fossil fuels	TJ	455	513	462	285	184	391	428	466	368	499	471	0	4521	
2	Kiln heat consumption from Alternate fuels 	TJ	30	33	32	22	14	25	38	35	28	31	23	0	311	
3	Kiln heat consumption from Biomass	TJ	10	20	19	12	9	9	15	20	19	19	10	0	162	
4	Total heat consumption of Kiln	TJ	495	566	514	320	206	424	481	521	415	549	504	0	4994	
5	HAG (Cement Mill) heat consumption from fossil fuels	TJ	0	0	0	0	0	0	0	0	0	0	0	0	0	
6	HAG (Cement Mill) heat consumption from Alternate fuels 	TJ	0	0	0	0	0	0	0	0	0	0	0	0	0	
7	HAG (Cement Mill) heat consumption from Biomass	TJ	0	0	0	0	0	0	0	0	0	0	0	0	0	
8	Total heat consumption of HAG (Cement Mill)	TJ	0	0	0	0	0	0	0	0	0	0	0	0	0	
10	On-site Power generation	TJ	125	107	117	74	51	93	116	125	119	135	126	0	1187	
11	Total Non- kiln fuel consumption	TJ	125	107	117	74	51	93	116	125	119	135	126	0	1187	
12	TSR (Thermal Substitution Ratio)  alternative fuel	%	6.16	5.78	6.30	6.99	6.80	5.82	7.97	6.68	6.67	5.60	4.48	0	6	
13	TSR (Thermal Substitution Ratio) Biomass	%	2.03	3.45	3.79	3.79	4.17	2.12	3.16	3.76	4.60	3.49	2.00	0	3	
14	TSR	%	8.19	9.24	10.09	10.78	10.97	7.94	11.13	10.43	11.27	9.09	6.48	0	9	
15	Specific Heat Consumption	Kcal/kg of clinker	725	711	703	703	704	705	708	710	713	708	723	0	711	
16	Heat rate of Power plant	Kcal/kwh Gross	2822	2929	2872	2978	2874	2870	2908	3043	2926	2960	2911	0	2918	
17	Plant Load Factor	%	82	65	75	44	31	60	71	76	72	81	85	0	68	
                                                                
    POWER															
    Onsite power generation															
18	Total Power generation from On-site power plant	MWh	 10,617 	 8,714 	 9,757 	 5,907 	 4,208 	 7,769 	 9,509 	 9,823 	 9,703 	 10,862 	10313.274	0	 97,182 	
19	Power delivered to cement plant	MWh	 9,404 	 7,670 	 8,621 	 5,215 	 3,732 	 6,877 	 8,397 	 8,697 	 8,595 	 9,708 	9181.695	0	 86,098 	
20	Power consumed by power plant equipment	%	11.43	11.98	11.64	11.71	11.31	11.48	11.69	11.46	11.42	10.62	11	0	11	
    WHRS Power Plant															
21	Total power generation from WHRS power plant	MWh	 2,814 	 4,538 	 4,995 	 3,216 	 1,711 	 3,456 	 3,841 	 4,133 	 3,236 	 4,001 	3460.77	0	 39,402 	
22	Power delivered to cement plant by WHRS	MWh	 2,438 	 3,922 	 4,308 	 2,780 	 1,437 	 2,926 	 3,249 	 3,532 	 2,759 	 3,424 	2946.862	0	 33,722 	
23	Power consumed by WHRS equipment	%	13.36	13.57	13.75	13.56	16.01	15.34	15.41	14.54	14.74	14.42	15	0	14	
    Solar Power Plant															
24	Total power generation from Solar power plant	MWh	170	155	125	90	99	88	91	102	94	110	129	0	1253.235	
25	Power delivered to cement plant by Solar	MWh	165	149	120	86	94	84	87	98	89	107	125	0	1204.012	
26	Power consumed by Solar equipment	%	2.94	3.87	4.00	4.44	5.05	4.55	4.40	3.92	5.32	2.73	3	0	4	
    Hydel Power Plant															
27	Power delivered to cement plant by Hydel	MWh	0	0	0	0	0	0	0	0	0	0	0	0	0	
28	Total Grid Power consumed (Including import from SCL-R)	MWh	 1,264 	 1,790 	 917 	 1,833 	 2,912 	 1,255 	 992 	 1,029 	 1,113 	 1,458 	2241.145	0	 16,804 	
29	Power delivered to cement plant from the grid	MWh	 1,236 	 1,754 	 911 	 1,786 	 2,851 	 1,219 	 981 	 1,022 	 1,096 	 1,435 	2228.44	0	 16,519 	
30	Total power consumption up to clinker production	MWh	 8,566 	 9,853 	 9,256 	 6,082 	 4,141 	 7,772 	 8,567 	 9,250 	 7,556 	 9,838 	8794.372	0	 89,675 	
31	Total cement plant power consumption from Cr to dispatch	MWh	 13,243 	 13,495 	 13,960 	 9,867 	 8,114 	 11,106 	 12,714 	 13,349 	 12,539 	 14,674 	14482	0	137543	
32	Specific power consumption for cementitious	KWH/ t of cementitious	69.80	63.96	69.62	75.88	89.80	68.50	68.55	67.11	75.31	68.93	74	0	71	
33	Power consumption for Clinker	kWh	8566165	9852784	9256474	6082350	4140786	7772145	8566782	9249947	7556010	9837513	8794372	0	89675328	
33.1	LS crusher	kWh	339865	383137	370126	314075	243026	373316	375750	460795	355935	447577	399274	0	4062876	
33.2	Raw mill	kWh	3192724	3672029	3582111	2420497	1643857	3143515	3304406	3464570	2851789	3829827	3311065	0	34416390	
33.3	Pyro	kWh	4188296	4780947	4306169	2761156	1839755	3482293	4057044	4365900	3591010	4606228	4221508	0	42200306	
33.4	Coal mill	kWh	845280	1016671	998068	586622	414148	773021	829582	958682	757276	953881	862525	0	8995756	
34	Specific power consumption for Clinker (SEC upto Clinkerization)	KWH/ t of clinker	52.4720371	51.81367074	53.01197519	55.92811233	59.11861455	54.05769431	52.78167166	52.73960739	54.36721566	53.0807744	52.82444454	0	53.40738654	
34.1	LS crusher	KWH/ t of clinker	2.081842795	2.014835032	2.119717544	2.887966309	3.469718169	2.596529299	2.315071532	2.62727423	2.561033523	2.415014218	2.398286912	0	2.419702206	
34.2	Raw mill	KWH/ t of clinker	19.5570284	19.31041029	20.5148072	22.2568297	23.46958967	21.86412798	20.3591118	19.75363335	20.51927242	20.66479434	19.88830691	0	20.49715886	
34.3	Pyro	KWH/ t of clinker	25.65540392	25.14197141	24.66149899	25.38923984	26.26645441	24.22043471	24.99626631	24.89266716	25.83813615	24.85406111	25.3569914	0	25.1329781	
34.4	Coal mill	KWH/ t of clinker	5.177761988	5.346454001	5.715951458	5.394076485	5.912852289	5.37660233	5.111222013	5.466032647	5.448773573	5.146904727	5.180859307	0	5.357547373	
35	Power consumption in cement grinding and packing	kWh	4635457	3598651	4664056	3752579	3939082	3299408	4107547	4055968	4946251	4794632	5638213	0	47431844	
35.1	Power consumed in cement grinding	kWh	4203445	3153329	4240983	3363348	3525847	2769793	3487132	3655618	4504276	4347569	5185303	0	42436643	
35.2	Power consumed in cement packing	kWh	186283	195963	190727	176099	175380	159691	183656	182063	203748	214599	234887	0	2103096	
35.3	Power consumed in Utilities and others (Lightning in colony, Misc and Tr loss)	kWh	245729	249359	232346	213132	237855	369924	436759	218287	238227	232464	218023	0	2892105	
36	SEC of cement grinding and packing	KWH/ t of Cement	35.66422004	35.2497894	34.31168525	34.72038305	33.79735736	36.25922303	35.75822234	33.93689495	33.56690306	33.78166702	34.27276761	0	34.57630474	
36.1	SEC of cement grinding	KWH/ t of Cement	32.34041162	30.88773631	31.19929818	31.11905996	30.25179751	30.43895818	30.3572038	30.58710622	30.56751383	30.63178327	31.51968269	0	30.93496219	
36.2	SEC OF cement packing	KWH/ t of Cement	1.433221773	1.919512195	1.403105965	1.629339378	1.504761905	1.754942579	1.598816053	1.523348534	1.382701639	1.512005918	1.427797702	0	1.533090052	
36.3	SEC of Utilities and others (Lightning in colony, Misc and Tr loss)	KWH/ t of Cement	1.890586651	2.442540895	1.709281111	1.971983716	2.040797941	4.06532227	3.80220249	1.826440196	1.616687591	1.637877827	1.325287217	0	2.108252503	
37	Power consumption for overall cement	kWh	4203445	3153329	4240983	3363348	3525847	2769793	3487133	3655617	4504274	4347569	5185303	0	42436641	
37.1	Power consumption for OPC	kWh	2546708	1982593	2581208	1980576	2200583	1554767	2064281	2146527	2739230	2592406	3478599	0	25867478	
37.2	Power consumption for PPC	kWh	1656737	1170736	1485204	1238620	1238000	1106061	1320386	1379374	1557238	1646991	1565197	0	15364544	
37.3	Power consumption for PSC	kWh	0	0	0	0	0	0	0	0	0	0	0	0	0	
37.4	Power consumption for CC	kWh	0	0	0	0	0	0	0	0	0	0	0	0	0	
37.5	Power consumption for IPC	kWh	0	0	0	0	0	0	0	0	0	0	0	0	0	
37.6	Power consumption for super PPC	kWh	0	0	174571	144152	87264	108965	102466	129716	207806	108172	141507	0	1204619	
37.7	Power consumption for GGBS	kWh	0	0	0	0	0	0	0	0	0	0	0	0	0	
37.8	Power consumption for Super OPC	kWh	0	0	0	0	0	0	0	0	0	0	0	0	0	
38	Specific power consumption for overall cement	KWH/ t of Cement	80.81464829	81.94699737	80.47403315	81.49437814	79.62228183	84.19607118	81.94705845	80.44030606	78.94943477	79.99342581	79.5082817	0	80.75454618	
38.1	SEC of OPC	KWH/ t of Cement	36.02387722	35.71917845	33.99233555	34.05392022	33.07406628	34.54270162	34.09780311	33.68950797	33.03461167	33.64357926	33.94583069	0	34.10144158	
38.2	SEC of PPC	KWH/ t of Cement	27.9476552	25.13117956	27.03418399	27.09320384	26.22381326	25.99316131	26.08582097	26.84651615	27.01474568	26.883943	27.25209806	0	26.73866336	
38.3	SEC of PSC	KWH/ t of Cement	0	0	0	0	0	0	0	0	0	0	0	0	0	
38.4	SEC of CC	KWH/ t of Cement	0	0	0	0	0	0	0	0	0	0	0	0	0	
38.5	SEC of IPC	KWH/ t of Cement	0	0	0	0	0	0	0	0	0	0	0	0	0	
38.6	SEC of Super PPC	KWH/ t of Cement	0	0	34.5070172	34.29740661	31.09907341	31.74046024	27.59655265	29.34751131	30.60020616	29.94795127	30.75570528	0	31.17705368	
38.7	SEC of Super GGBS	KWH/ t of Cement	0	0	0	0	0	0	0	0	0	0	0	0	0	
38.8	SEC of Super OPC	KWH/ t of Cement	0	0	0	0	0	0	0	0	0	0	0	0	0	
39	Ratio of electrical green energy	%	19.66	30.17	31.72	29.05	18.87	27.10	26.24	27.19	22.71	24.06	21.21	0.00	25.39	
40	Ratio of Renewable energy	%	1.25	1.10	0.86	0.87	1.16	0.76	0.68	0.73	0.71	0.73	0.86	0.00	0.88	
41	DG power consumption	MWH	0	0	0	0	4.41	0	0	0	0	1.3	0	0	5.71	
42	Onsite power generation export to grid	MWH	0.28	0.2	0.21	0.63	0.14	0.43	0.29	0.26	0.43	0.3	0.28	0	3.45	


## EMISSION SUMMARY ACTUAL DATA

EMISSION SUMMARY																
S.No	Parameter	Unit	April	May	June	July	August	September 	October 	November 	December 	January 	February 	March 	YOD	2023-24
1	Scope 1	TCO2	 1,41,462 	 1,60,349 	 1,48,511 	 92,690 	 59,984 	 1,22,600 	 1,39,258 	 1,50,743 	 1,21,793 	 1,59,463 	 1,44,829 	 -   	 14,41,674 	
2	Raw meal Calcination process	TCO2	 83,542 	 97,466 	 89,435 	 55,884 	 35,904 	 74,230 	 83,596 	 90,393 	 71,760 	 95,516 	 85,971 	 -   	 8,63,689 	 -   
3	Gross Fuel emission (Kiln)	TCO2	 45,622 	 52,315 	 47,482 	 29,503 	 19,064 	 39,141 	 44,265 	 48,076 	 38,349 	 50,704 	 46,513 	 -   	 4,61,035 	
4	Gross Fuel Emission (CPP)	TCO2	 12,034 	 10,251 	 11,255 	 7,066 	 4,858 	 8,954 	 11,108 	 12,006 	 11,403 	 12,915 	 12,060 	 -   	 1,13,910 	
6	Gross Fuel Emission Cement mill (HAG)	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
7	Internal transport (owned vehicle)	TCO2	248	277	308	230	154	270	285	263	247	300	268	0	2850	
8	Other Sources	TCO2	16.27	40.34	30.30	6.79	4.03	4.13	4.25	4.59	32.93	26.99	18.45	0.00	189.07	
                                                                
                                                                
KILN																
1	Gross CO2 fuel emission including AF and Biomass	TCO2	 45,622 	 52,315 	 47,482 	 29,503 	 19,064 	 39,141 	 44,265 	 48,076 	 38,349 	 50,704 	 46,513 	 -   	 4,61,035 	
2	CO2 Emissions from Alternate fuels & bio mass	TCO2	 3,395 	 4,624 	 4,590 	 3,013 	 2,004 	 2,862 	 4,587 	 4,790 	 4,196 	 4,424 	 2,810 	 -   	 41,295 	
3	Net CO2 fuel emission excluding Alternate fuel	TCO2	 43,330 	 49,840 	 45,033 	 27,822 	 18,007 	 37,269 	 41,348 	 45,439 	 36,252 	 48,389 	 44,810 	 -   	 4,37,539 	
4	Net CO2 Emissions excluding Alternate fuel and Biomass	TCO2	 42,227 	 47,691 	 42,892 	 26,490 	 17,060 	 36,279 	 39,678 	 43,286 	 34,153 	 46,280 	 43,703 	 -   	 4,19,740 	
5	CO2 Emissions from only biomass	TCO2	 1,104 	 2,149 	 2,141 	 1,332 	 947 	 990 	 1,670 	 2,152 	 2,099 	 2,109 	 1,107 	 -   	 17,799 	
6	Net CO2 Emissions excluding biomass	TCO2	 44,518 	 50,166 	 45,341 	 28,172 	 18,117 	 38,151 	 42,595 	 45,924 	 36,251 	 48,595 	 45,406 	 -   	 4,43,236 	
                                                                
                                                                
CPP																
1	Gross CO2 fuel emission including AF and Biomass	TCO2	 12,034 	 10,251 	 11,255 	 7,066 	 4,858 	 8,954 	 11,108 	 12,006 	 11,403 	 12,915 	12060	0	 1,13,910 	
2	CO2 Emissions from Alternate fuels & bio mass	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
3	Net CO2 fuel emission excluding Alternate fuel	TCO2	 12,034 	 10,251 	 11,255 	 7,066 	 4,858 	 8,954 	 11,108 	 12,006 	 11,403 	 12,915 	12060	0	 1,13,910 	
4	Net CO2 Emissions excluding Alternate fuel and Biomass	TCO2	 12,034 	 10,251 	 11,255 	 7,066 	 4,858 	 8,954 	 11,108 	 12,006 	 11,403 	 12,915 	12060	0	 1,13,910 	
5	CO2 Emissions from only biomass	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
6	Net CO2 Emissions excluding biomass	TCO2	 12,034 	 10,251 	 11,255 	 7,066 	 4,858 	 8,954 	 11,108 	 12,006 	 11,403 	 12,915 	12060	0	 1,13,910 	
                                                                
                                                                
Cement Mill (HAG)																
1	Gross CO2 fuel emission including AF and Biomass	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
2	CO2 Emissions from Alternate fuels & bio mass	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
3	Net CO2 fuel emission excluding Alternate fuel	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
4	Net CO2 Emissions excluding Alternate fuel and Biomass	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
5	CO2 Emissions from only biomass	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
6	Net CO2 Emissions excluding biomass	TCO2	0	0	0	0	0	0	0	0	0	0	0	0	0	

## CONSOLIDATED EMISSIONS ACTUAL DATA

Consolidated Emission																
S.No	Parameter	Unit	April	May	June	July	August	September 	October 	November 	December 	January 	February 	March 	YOD	2023-24
1	Gross CO2 Emissions	T CO2	 1,41,462 	 1,60,349 	 1,48,511 	 92,690 	 59,984 	 1,22,600 	 1,39,258 	 1,50,743 	 1,21,793 	 1,59,463 	144829.223	0	 14,41,674 	
2	CO2 Emissions from Alternative fuels & biomass	T CO2	 3,395 	 4,624 	 4,590 	 3,013 	 2,004 	 2,862 	 4,587 	 4,790 	 4,196 	 4,424 	2810.175986	0	 41,295 	
3	Net CO2 Emissions excluding AF and Biomass	T CO2	 1,38,067 	 1,55,725 	 1,43,921 	 89,677 	 57,980 	 1,19,738 	 1,34,671 	 1,45,953 	 1,17,596 	 1,55,039 	142019.047	0	 14,00,379 	
4	CO2 Emissions from only biomass	T CO2	 1,104 	 2,149 	 2,141 	 1,332 	 947 	 990 	 1,670 	 2,152 	 2,099 	 2,109 	1107.164613	0	 17,799 	
5	Net CO2 Emissions excluding biomass	T CO2	 1,40,358 	 1,58,200 	 1,46,370 	 91,358 	 59,037 	 1,21,610 	 1,37,588 	 1,48,591 	 1,19,694 	 1,57,354 	143722.0583	0	 14,23,875 	
6	Gross CO2 Emission from raw materials (Calcination) 	T CO2	 83,542 	 97,466 	 89,435 	 55,884 	 35,904 	 74,230 	 83,596 	 90,393 	 71,760 	 95,516 	85970.6058	0	 8,63,689 	
7	Gross CO2 fuel emission including AF and Biomass (Kiln)	T CO2	 45,622 	 52,315 	 47,482 	 29,503 	 19,064 	 39,141 	 44,265 	 48,076 	 38,349 	 50,704 	46512.71007	0	 4,61,035 	
8	Net CO2 fuel emission excluding  AF and biomass (Kiln)	T CO2	 42,227 	 47,691 	 42,892 	 26,490 	 17,060 	 36,279 	 39,678 	 43,286 	 34,153 	 46,280 	43702.53409	0	 4,19,740 	
9	Gross CO2 fuel emission including AF and Biomass (HAG)	T CO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
10	Net CO2 fuel emission excluding  AF and biomass (HAG)	T CO2	0	0	0	0	0	0	0	0	0	0	0	0	0	
11	Gross CO2 emission from power generation (CPP) / cementitious	T CO2	 12,034 	 10,251 	 11,255 	 7,066 	 4,858 	 8,954 	 11,108 	 12,006 	 11,403 	 12,915 	12059.53607	0	 1,13,910 	
12	Gross CO2 emission from internal transport and equipment	T CO2	248	277	308	230	154	270	285	263	247	300	267.9190155	0	2850	
13	Gross CO2 emission from other source	T CO2	16.27	40.34	30.30	6.79	4.03	4.13	4.25	4.59	32.93	26.99	18.452	0	189.07	
14	Scope 2 Absolute CO2 emission (purchased energy) 	T CO2	905	1281	656	1312	2085	898	710	737	797	1044	1604.45934	0	12029	
15	Scope 3 Absolute CO2 emission (transportation of raw material receipts & dispatch of cement and clinker , employee commute)	T CO2	693	632	672	502	528	368	500	539	775	782	718	0	6700	
16	Specific CO2 emission from rawmaterial 	kg CO2/t cementitious	440	462	446	430	397	458	451	454	431	449	442	0	445	
17	Specific CO2  fuel emission including AF and Biomass (Kiln)	kg CO2/t cementitious	240	248	237	227	211	241	239	242	230	238	239	0	237	
19	Specific CO2  fuel emission including AF and Biomass (HAG)	kg CO2/t cementitious	0	0	0	0	0	0	0	0	0	0	0	0	0	
21	Specific CO2 emission from power generation(CPP)	kg CO2/t cementitious	63	49	56	54	54	55	60	60	68	61	62	0	59	
22	Specific CO2 emission from Internal transportation 	kg CO2/t cementitious	1.31	1.31	1.53	1.77	1.71	1.67	1.53	1.32	1.49	1.41	1	0	1.47	
23	Specific CO2 emission from other sources 	kg CO2/t cementitious	0.086	0.191	0.151	0.052	0.045	0.025	0.023	0.023	0.198	0.127	0	0	0.097	
24	Specific CO2 emission from rawmaterial 	kg CO2/t clinker	512	513	512	514	513	516	515	515	516	515	516	0	514	
25	Specific CO2  fuel emission including AF and Biomass (Kiln)	kg CO2/t clinker	279	275	272	271	272	272	273	274	276	274	279	0	275	
27	Specific CO2  fuel emission including AF and Biomass (HAG)	kg CO2/t clinker	0	0	0	0	0	0	0	0	0	0	0	0	0	
29	Specific CO2 emission from power generation(CPP)	kg CO2/t clinker	 74 	 54 	 64 	 65 	 69 	 62 	 68 	 68 	 82 	 70 	 72 	 -   	 68 	
30	Specific CO2 emission from Internal transportation 	kg CO2/t clinker	1.52	1.46	1.76	2.11	2.20	1.88	1.75	1.50	1.78	1.62	2	0	1.70	
31	Specific CO2 emission from other sources 	kg CO2/t clinker	0.100	0.212	0.174	0.062	0.058	0.029	0.026	0.026	0.237	0.146	0	0	0.113	
32	Gross CO2 emission intensity per Ton of Clinker - scope 2	kg CO2/t clinker	6	7	4	12	30	6	4	4	6	6	10	0	7	
33	Gross CO2 emission intensity per Ton of Clinker - scope 3	kg CO2/t clinker	4	3	4	5	8	3	3	3	6	4	4	0	4	
34	Total gross CO2 emission intensity per ton of clinker	kg CO2/t clinker	876	853	858	869	894	862	865	867	888	870	884	0	870	
32	Emission Intensity -Scope 1 	kg CO2/t cementitious	746	760	741	713	664	756	751	758	732	749	745	0	742	
33	Emission Intensity -Scope 2 	kg CO2/t cementitious	5	6	3	10	23	6	4	4	5	5	8	0	6	
34	Emission Intensity -Scope 3 	kg CO2/t cementitious	4	3	3	4	6	2	3	3	5	4	4	0	3	
35	 Emission Intensity 	kg CO2/t cementitious	754	769	747	727	693	764	757	764	741	758	757	0	752	