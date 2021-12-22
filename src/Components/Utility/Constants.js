import airConditioner from '../FurnishingIcons/airConditioner.svg'
import bulb from '../FurnishingIcons/bulb.svg'
import bed from '../FurnishingIcons/bed.svg'
import cupBoard from '../FurnishingIcons/cupboard.svg'
import curtain from '../FurnishingIcons/curtain.svg'
import diningTable from '../FurnishingIcons/dinner.svg'
import fan from '../FurnishingIcons/fan.svg'
import modularKitchen from '../FurnishingIcons/modularKitchen.svg'
import oven from '../FurnishingIcons/oven.svg'
import refrigerator from '../FurnishingIcons/refrigerator.svg'
import sofa from '../FurnishingIcons/sofa.svg'
import stove from '../FurnishingIcons/stove.svg'
import television from '../FurnishingIcons/television.svg'
import wardrobe from '../FurnishingIcons/wardrobe.svg'
import washingMachine from '../FurnishingIcons/washing-machine.svg'
import waterHeater from '../FurnishingIcons/waterHeater.svg'

import wifi2 from '../Icons/FeatureIcons/wifi-2.svg';
import gym2 from '../Icons/FeatureIcons/gym-2.svg';
import airCondition2 from '../Icons/FeatureIcons/airconditioning-2.svg';
import intercom2 from '../Icons/FeatureIcons/intercom-2.svg';
import security2 from '../Icons/FeatureIcons/security-2.svg';
import pool2 from '../Icons/FeatureIcons/swimming-pool-2.svg';
import park2 from '../Icons/FeatureIcons/park-2.svg';
import fireAlarm2 from '../Icons/FeatureIcons/fire-alarm-2.svg';
import fengShui2 from '../Icons/FeatureIcons/fengshui-2.svg';
import maintenance2 from '../Icons/FeatureIcons/maintenance-2.svg';
import cctv2 from '../Icons/FeatureIcons/cctv-2.svg';
import clubHouse2 from '../Icons/FeatureIcons/MoreAmenitiesIcons/club-house-2.svg';
import privateTerrace2 from '../Icons/FeatureIcons/MoreAmenitiesIcons/private-terrace-2.svg';
import rainWaterHarvesting2 from '../Icons/FeatureIcons/MoreAmenitiesIcons/rain-water-harvesting-2.svg';
import shoppingCentre2 from '../Icons/FeatureIcons/MoreAmenitiesIcons/shopping-centre-2.svg';
import wasteDisposal2 from '../Icons/FeatureIcons/MoreAmenitiesIcons/waste-disposal-2.svg';
import waterPurifier2 from '../Icons/FeatureIcons/MoreAmenitiesIcons/water-purifier-2.svg';

import wifi from '../Icons/FeatureIcons/wifi.svg';
import gym from '../Icons/FeatureIcons/gym.svg';
import airCondition from '../Icons/FeatureIcons/airconditioning.svg';
import intercom from '../Icons/FeatureIcons/intercom.svg';
import security from '../Icons/FeatureIcons/security.svg';
import pool from '../Icons/FeatureIcons/swimming-pool.svg';
import park from '../Icons/FeatureIcons/park.svg';
import fireAlarm from '../Icons/FeatureIcons/fire-alarm.svg';
import fengShui from '../Icons/FeatureIcons/fengshui.svg';
import maintenance from '../Icons/FeatureIcons/maintenance.svg';
import cctv from '../Icons/FeatureIcons/cctv.svg';
import clubHouse from '../Icons/FeatureIcons/MoreAmenitiesIcons/club-house.svg';
import privateTerrace from '../Icons/FeatureIcons/MoreAmenitiesIcons/private-terrace.svg';
import rainWaterHarvesting from '../Icons/FeatureIcons/MoreAmenitiesIcons/rain-water-harvesting.svg';
import shoppingCentre from '../Icons/FeatureIcons/MoreAmenitiesIcons/shopping-centre.svg';
import wasteDisposal from '../Icons/FeatureIcons/MoreAmenitiesIcons/waste-disposal.svg';
import waterPurifier from '../Icons/FeatureIcons/MoreAmenitiesIcons/water-purifier.svg';

import poojaRoom from '../ColorIcons/poojaRoom.svg'
import guestRoom from '../ColorIcons/guestRoom.svg'
import studyRoom from '../ColorIcons/studyRoom.svg'
import serviceArea from '../ColorIcons/serviceArea.svg'
import servantRoom from '../ColorIcons/servantRoom.svg'



export const propertyTypeConstant = [
    "Residential Apartment", "Independent House / Villa", "Independent / Builder Floor", "Studio Apartment", "Serviced Apartment", "Residential Land"
]

export const propertyForConstant = [
    "Sale", "Rent"
]

export const postedByConstant = [
    "Owner", "Dealer"
]

export const constructionStatusConstant = [
    "Resale", "New Property", "Under Construction"
]

export const bedroomConstant = [
    "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK", "7 BHK", "7+ BHK", 
]

export const furnishingConstant = [
    "Furnished", "Semifurnished", "Unfurnished"
]

export const propertyTypeFilterList = [
    {key: 0, name: "Residential Apartment", active: true},
    {key: 1, name: "Independent / Builder Floor", active: true},
    {key: 2, name: "Studio Apartment", active: true},
    {key: 3, name: "Serviced Apartment", active: true},
    {key: 4, name: "Residential Land", active: true},
    {key: 5, name: "Independent House / Villa", active: true}    
]
  
export const amenitiesFilterList = [
    {key: 1, name: "Parking", active: false},
    {key: 2, name: "Elevator", active: false},
    {key: 3, name: "Security Personnel", active: false},
    {key: 4, name: "Power Backup", active: false},
    {key: 5, name: "Swimming Pool", active: false}
]

export const constructionStatusFilter = [
    {key: 0, name: "Resale", active: true},
    {key: 1, name: "New Property", active: true},
    {key: 2, name: "Under Construction", active: true}
]
  
export const configurationFilterList = [
    {key: 1, name: 1, active: true},
    {key: 2, name: 2, active: true},
    {key: 3, name: 3, active: true},
    {key: 4, name: 4, active: true},
    {key: 5, name: 5, active: true},
    {key: 6, name: 6, active: true},
    {key: 7, name: 7, active: true},
    {key: 8, name: "7+", active: true},
]

export const postedByFilterList = [
    {key: 1, name: "Owner", active: true},
    {key: 2, name: "Broker", active: true}
]

export const furnishingFilterList = [
    {key: 0, name: "Furnished", active: true},
    {key: 1, name: "SemiFurnished", active: true},
    {key: 2, name: "Unfurnished", active: true}
]

export const otherRoomsConstant = [
    { id: 0, name: 'Pooja Room', icon: poojaRoom},
    { id: 1, name: 'Study Room', icon: studyRoom},
    { id: 2, name: 'Guest Room', icon: guestRoom},
    { id: 3, name: 'Servant Room', icon: servantRoom},
    { id: 4, name: 'Service Area', icon: serviceArea}
]

export const transactionTypeConstant = [
    {id: 0, name: "Resale"},
    {id: 1, name: "New Property"},
    {id: 2, name: "Under Construction"},
    {id: 3, name: "Rental"}
]

export const subPropertyTypeConstant = [
    { id: 0, name: 'Residential Apartment'},
    { id: 1, name: 'Independant / Builder Floor'},
    { id: 2, name: 'Studio Apartment'},
    { id: 3, name: 'Serviced Apartment'},
    { id: 4, name: 'Residential Land'},
    { id: 5, name: 'Independent House / Villa'}
];

export const furnishingItemsConstant = () => [
    {id: 0, icon: airConditioner, label: 1, name: "Air Conditioner", type: "input", number: 0, active: false},
    {id: 1, icon: bulb, label: 2, name: "Lights", type: "input", number: 0, active: false},
    {id: 2, icon: bed, label: 3, name: "Bed", type: "input", number: 0, active: false},
    {id: 3, icon: cupBoard, label: 4, name: "Cupboard", type: "input", number: 0, active: false},
    {id: 4, icon: curtain, label: 5, name: "Curtains", type: "toggle", active: false, number: 0},
    {id: 5, icon: diningTable, label: 6, name: "Dining Table", type: "toggle", active: false, number: 0},
    {id: 6, icon: fan, label: 7, name: "Fan", type: "input", number: 0, active: false},
    {id: 7, icon: modularKitchen, label: 8, name: "Modular Kitchen", type: "toggle", active: false, number: 0},
    {id: 8, icon: oven, label: 9, name: "Microwave", type: "toggle", active: false, number: 0},
    {id: 9, icon: refrigerator, label: 10, name: "Refrigerator", type: "toggle", active: false, number: 0},
    {id: 10, icon: sofa, label: 11, name: "Sofa / Couch", type: "toggle", active: false, number: 0},
    {id: 11, icon: stove, label: 12, name: "Stove", type: "toggle", active: false, number: 0},
    {id: 12, icon: television, label: 13, name: "Television", type: "input", number: 0, active: false},
    {id: 13, icon: wardrobe, label: 14, name: "Wardrobe", type: "input", number: 0, active: false},
    {id: 14, icon: washingMachine, label: 15, name: "Washing Machine", type: "toggle", active: false, number: 0},
    {id: 15, icon: waterHeater, label: 16, name: "Water Heater", type: "input", number: 0, active: false},
]

export const furnishingItemsConstantForAutoFormFill = [
    {id: 0, icon: airConditioner, label: 1, name: "Air Conditioner", type: "input", number: 2, active: true},
    {id: 1, icon: bulb, label: 2, name: "Lights", type: "input", number: 4, active: true},
    {id: 2, icon: bed, label: 3, name: "Bed", type: "input", number: 1, active: true},
    {id: 3, icon: cupBoard, label: 4, name: "Cupboard", type: "input", number: 0, active: false},
    {id: 4, icon: curtain, label: 5, name: "Curtains", type: "toggle", active: true, number: 0},
    {id: 5, icon: diningTable, label: 6, name: "Dining Table", type: "toggle", active: false, number: 0},
    {id: 6, icon: fan, label: 7, name: "Fan", type: "input", number: 4, active: true},
    {id: 7, icon: modularKitchen, label: 8, name: "Modular Kitchen", type: "toggle", active: false, number: 0},
    {id: 8, icon: oven, label: 9, name: "Microwave", type: "toggle", active: false, number: 0},
    {id: 9, icon: refrigerator, label: 10, name: "Refrigerator", type: "toggle", active: false, number: 0},
    {id: 10, icon: sofa, label: 11, name: "Sofa / Couch", type: "toggle", active: false, number: 0},
    {id: 11, icon: stove, label: 12, name: "Stove", type: "toggle", active: false, number: 0},
    {id: 12, icon: television, label: 13, name: "Television", type: "input", number: 1, active: true},
    {id: 13, icon: wardrobe, label: 14, name: "Wardrobe", type: "input", number: 0, active: false},
    {id: 14, icon: washingMachine, label: 15, name: "Washing Machine", type: "toggle", active: true, number: 0},
    {id: 15, icon: waterHeater, label: 16, name: "Water Heater", type: "input", number: 2, active: true},
]

export const amenitiesConstants = () => [
    {id: 0, active: false, icon2: wifi2, icon1: wifi, label: "wifi2", name: "Wi-Fi Connectivity"},            
    {id: 1, active: false, icon2: airCondition2, icon1: airCondition, label: "airCondition2", name: "Centrally Air Conditioned"}, 
    {id: 2, active: false, icon2: rainWaterHarvesting2, icon1: rainWaterHarvesting, label: "rainWaterHarvesting2", name: "Rain Water Harvesting"},
    {id: 3, active: false, icon2: security2, icon1: security, label: "security2", name: "Security Personnel"}, 
    {id: 4, active: false, icon2: pool2, icon1: pool, label: "pool2", name: "Swimming Pool"},
    {id: 5, active: false, icon2: park2, icon1: park, label: "park2", name: "Park"},
    {id: 6, active: false, icon2: fireAlarm2, icon1: fireAlarm, label: "fireAlarm2", name: "Fire Alarm"}, 
    {id: 7, active: false, icon2: cctv2, icon1: cctv, label: "cctv2", name: "Surveillance"},
    {id: 8, active: false, icon2: fengShui2, icon1: fengShui, label: "fengShui2", name: "Feng Shui / Vaastu Compliant"}, 
    {id: 9, active: false, icon2: maintenance2, icon1: maintenance, label: "maintenance2", name: "Maintenance Staff"},
    {id: 10, active: false, icon2: waterPurifier2, icon1: waterPurifier, label: "waterPurifier2", name: "Water Purifier"},
    
]

export const moreAmenitiesConstants = () => [
    {id: 0, active: false, icon2: gym2, icon1: gym, label: "gym2", name: "Gym / Fitness Centre"},
    {id: 1, active: false, icon2: clubHouse2, icon1: clubHouse, label: "clubHouse2", name: "Club House"}, 
    {id: 2, active: false, icon2: privateTerrace2, icon1: privateTerrace, label: "privateTerrace2", name: "Private Terrace"},
    {id: 3, active: false, icon2: intercom2, icon1: intercom, label: "intercom2", name: "Intercom Facility"},
    {id: 4, active: false, icon2: wasteDisposal2, icon1: wasteDisposal, label: "wasteDisposal2", name: "Waste Disposal"},
    {id: 5, active: false, icon2: shoppingCentre2, icon1: shoppingCentre, label: "shoppingCentre2", name: "Shopping Centre"}
]

export const amenitiesConstantsForAutoFill = () => [
    {id: 0, active: false, icon2: wifi2, icon1: wifi, label: "wifi2", name: "Wi-Fi Connectivity"},            
    {id: 1, active: false, icon2: airCondition2, icon1: airCondition, label: "airCondition2", name: "Centrally Air Conditioned"}, 
    {id: 2, active: true, icon2: rainWaterHarvesting2, icon1: rainWaterHarvesting, label: "rainWaterHarvesting2", name: "Rain Water Harvesting"},
    {id: 3, active: true, icon2: security2, icon1: security, label: "security2", name: "Security Personnel"}, 
    {id: 4, active: false, icon2: pool2, icon1: pool, label: "pool2", name: "Swimming Pool"},
    {id: 5, active: false, icon2: park2, icon1: park, label: "park2", name: "Park"},
    {id: 6, active: true, icon2: fireAlarm2, icon1: fireAlarm, label: "fireAlarm2", name: "Fire Alarm"}, 
    {id: 7, active: false, icon2: cctv2, icon1: cctv, label: "cctv2", name: "Surveillance"},
    {id: 8, active: true, icon2: fengShui2, icon1: fengShui, label: "fengShui2", name: "Feng Shui / Vaastu Compliant"}, 
    {id: 9, active: true, icon2: maintenance2, icon1: maintenance, label: "maintenance2", name: "Maintenance Staff"},
    {id: 10, active: true, icon2: waterPurifier2, icon1: waterPurifier, label: "waterPurifier2", name: "Water Purifier"},
    
]
export const moreAmenitiesConstantsForAutoFill = () => [
    {id: 0, active: false, icon2: gym2, icon1: gym, label: "gym2", name: "Gym / Fitness Centre"},
    {id: 1, active: false, icon2: clubHouse2, icon1: clubHouse, label: "clubHouse2", name: "Club House"}, 
    {id: 2, active: false, icon2: privateTerrace2, icon1: privateTerrace, label: "privateTerrace2", name: "Private Terrace"},
    {id: 3, active: true, icon2: intercom2, icon1: intercom, label: "intercom2", name: "Intercom Facility"},
    {id: 4, active: true, icon2: wasteDisposal2, icon1: wasteDisposal, label: "wasteDisposal2", name: "Waste Disposal"},
    {id: 5, active: false, icon2: shoppingCentre2, icon1: shoppingCentre, label: "shoppingCentre2", name: "Shopping Centre"}
]

export const generateAmenitiesConstantsForAutoFill = () => {
    const newAmenitiesConstants = amenitiesConstants();
    [2, 3, 6, 8, 9, 10].map(amenityId => {
        newAmenitiesConstants[amenityId].active = true
    })
    return newAmenitiesConstants
}

export const generateMoreAmenitiesConstantsForAutoFill = () => {
    const newMoreAmenitiesConstants = moreAmenitiesConstants();
    [3, 4].map(moreAmenityId => {
        newMoreAmenitiesConstants[moreAmenityId].active = true
    })
    return newMoreAmenitiesConstants
}

export const amenityConstant = [
    {id: 0, icon: wifi2, label: 0, name: "Wi-Fi Connectivity"},            
    {id: 1, icon: airCondition2, label: 1, name: "Centrally Air Conditioned"}, 
    {id: 2, icon: rainWaterHarvesting2, label: 2, name: "Rain Water Harvesting"},
    {id: 3, icon: security2, label: 3, name: "Security Personnel"}, 
    {id: 4, icon: pool2, label: 4, name: "Swimming Pool"},
    {id: 5, icon: park2, label: 5, name: "Park"},
    {id: 6, icon: fireAlarm2, label: 6, name: "Fire Alarm"}, 
    {id: 7, icon: cctv2, label: 7, name: "Surveillance"},
    {id: 8, icon: fengShui2, label: 8, name: "Feng Shui / Vaastu Compliant"}, 
    {id: 9, icon: maintenance2, label: 9, name: "Maintenance Staff"},
    {id: 10, icon: waterPurifier2, label: 10, name: "Water Purifier"},
    {id: 11, icon: gym2, label: 11, name: "Gym / Fitness Centre"},
    {id: 12, icon: clubHouse2, label: 12, name: "Club House"}, 
    {id: 13, icon: privateTerrace2, label: 13, name: "Private Terrace"},
    {id: 14, icon: intercom2, label: 14, name: "Intercom Facility"},
    {id: 15, icon: wasteDisposal2, label: 15, name: "Waste Disposal"},
    {id: 16, icon: shoppingCentre2, label: 16, name: "Shopping Centre"}
]

// GENERATE SUPERSCRIPT FOR FLOORS

export const generateSuperScript = (num) => {
    if([11, 12, 13].includes(num)){
        return "th"
    } else if(num % 10 === 1) {
        return "st"
    } else if(num % 10 === 2){
        return "nd"
    } else if(num % 10 === 3){
        return "rd"
    } else return "th"
}
