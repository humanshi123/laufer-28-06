const addDataEntry = (data, number, qty, description, price, material, service) => {
    // this should take the previous qty into account as well ideally
    data = data.push({
        number,
        qty,
        description,
        price,
        material,
        service
    });
    return data;
}

export const generateQuoteTableData = (formData) => {


    let data = [];
    if (formData.priceclass === "Exklusiv (BEL/KASSE)"){    
        return {data, "exclusiv": true}
    }
    if (formData.typework === "Prothesen") {
        console.log(formData)
        // for both upper and lower jaw implement a switch case for the different types of prosthetics
        let shippingTime = 0;
        switch (formData.upperJaw) {
            case "Prosthetics":
                generateQuoteProsthetics(data, true);
                shippingTime = 12;
                break;
            case "Metalprosthetics":
                generateQuoteProstheticsMetal(data, true);
                shippingTime = 12;
                break;
            case "Interimsprosthetics":
                generateQuoteProstheticsInterim(data, true, formData);
                shippingTime = Math.max(5,shippingTime);
                break;
            case "Interimsprosthetics_clamp":
                generateQuoteProstheticsInterimClamp(data, true, formData);
                shippingTime = Math.max(5,shippingTime);
                break;
            case "Coverdentureprosthetics":
                generateQuoteProstheticsCoverdenture(data, true);
                break;
            default:
                break;
        }

        switch (formData.lowerJaw) {
            case "Prosthetics":
                generateQuoteProsthetics(data, false);
                shippingTime = 12;
                break;
            case "Metalprosthetics":
                generateQuoteProstheticsMetal(data, false);
                shippingTime = 12;
                break;
            case "Interimsprosthetics":
                generateQuoteProstheticsInterim(data, false);
                shippingTime = Math.max(5,shippingTime);
                break;
            case "Interimsprosthetics_clamp":
                generateQuoteProstheticsInterimClamp(data, false, formData);
                shippingTime = Math.max(5,shippingTime);
                break;
            case "Coverdentureprosthetics":
                generateQuoteProstheticsCoverdenture(data, false);
                break;
            default:
                break;
                // return {};
        }
        console.log(data);
        return {data, "shippingTime": shippingTime};
    } else if (formData.typework === "Kronen- und Brückentechnik" && formData.material === "Zirkon") {
        if (formData.digital === "Konventionell"){
            generateQuoteZirkonConventional(data, formData);
            return {data, "shippingTime": 5};
        } else {
            generateQuoteZirkonDigital(data, formData);
            return {data, "shippingTime": 3};
        }
    } else if (formData.typework === "Kronen- und Brückentechnik" && formData.material === "NEM") {
        generateQuoteNEM(data, formData);
        return {data, "shippingTime": 7};
    } else if (formData.typework === "Kronen- und Brückentechnik" && formData.material === "Presskeramik") {
        generateQuoteCeramics(data, formData);
        return {data, "shippingTime": 6};
    } else if (formData.typework === "Schienen") {
        generateQuoteSplint(data, true, formData);
        generateQuoteSplint(data, false, formData);
        return {data, "shippingTime": 5};
    }

    
    return {};
}

const generateQuoteZirkonConventional = (data, formData) => {

    const teethAnyLetter = countTeethAnyLetter(formData);
    const teethWithKMBM = countTeeth(formData, ["KM", "BM"], null); 
    const teethWithKVBV = countTeeth(formData, ["KV", "BV"], null);

    addDataEntry(data, "*0732", 1.00, "Eingangsdesinfektion je Eingang", null, null, null);
    // if vollantom -> countModel = 1, else 2
    const countModel = formData.vollantom ? 1 : 2;
    addDataEntry(data, "0010", countModel, "Modell", null, null, null);
    addDataEntry(data, "0023", 1.00, "Verwendung von Kunststoff", null, null, null);
    addDataEntry(data, "0051", 1.00, "Sägemodell", null, null, null);
    addDataEntry(data, "0120", 2.00, "Mittelwertartikulator", null, null, null);
    addDataEntry(data, "*9710", teethAnyLetter, "Materialaufwand Zirkon je Einheit", null, null, null);
    addDataEntry(data, "*V101", teethAnyLetter, "Krone/Brgl. Zirkon Modellscan vollanatomisch", null, null, null);
    addDataEntry(data, "*L200", teethAnyLetter, "Zirkon Zahnfarben einfärben", null, null, null);
    addDataEntry(data, "*6202", teethWithKMBM, "Vollverblendung Keramik", null, null, null);
    addDataEntry(data, "1620", teethWithKVBV, "Vestibuläre Verblendung Keramik", null, null, null);
    addDataEntry(data, "9330", 4.00, "Versandkosten", null, null, null);
    addDataEntry(data, "*6203", 4.00, "Zuschlag je Versandgang Logistikpausch.", null, null, null);

    return data;
}

const generateQuoteZirkonDigital = (data, formData) => {

    const teethAnyLetter = countTeethAnyLetter(formData);
    const countTeethStumpDigital = countTeeth(formData, ["K"], null);

    if (!formData.ios){
        // make sure that IOSModel is not set
        addDataEntry(data, "*0065", 2.00, "Modell digital", null, null, null);
        addDataEntry(data, "*0102", countTeethStumpDigital, "Stumpf digital", null, null, null);
        addDataEntry(data, "*0409", 1.00, "Mittelwertartikulator digital", null, null, null);
    }
    addDataEntry(data, "*D101", teethAnyLetter, "Fräsung mit Digitalen Daten / Zirkon", null, null, null);
    addDataEntry(data, "*D102", teethAnyLetter, "Design je Einheit digital", null, null, null);
    addDataEntry(data, "*D103", teethAnyLetter, "Fertigstellung und Bemalung / Zirkon monolithisch, Standardfarbe Vita o.ä.", null, null, null);
    addDataEntry(data, "9330", 1.00, "Versandkosten", null, null, null);
    addDataEntry(data, "*6203", 1.00, "Zuschlag je Versandgang Logistikpausch.", null, null, null);

}

const generateQuoteNEM = (data, formData) => {

    const teethWithKM = countTeeth(formData, ["KM"], null);
    const teethWithBM = countTeeth(formData, ["BM"], null);
    const sumTeethKMBM = teethWithKM + teethWithBM;
    const countDesinfections = (teethWithKM >=2 || teethWithBM >= 2) ? 2 : 1;
    const countModels = formData.facebow==="true" ? 1 : 2;

    // Metallkeramik vollverblendet
    if (sumTeethKMBM > 0){
        addDataEntry(data, "", null, "---Metallkeramik vollverblendet---", null, null, null);
        addDataEntry(data, "*0732", countDesinfections, "Eingangsdesinfektion je Eingang", null, null, null);
        addDataEntry(data, "0010", countModels, "Modell", null, null, null);
        addDataEntry(data, "0023", 1.00, "Verwendung von Kunststoff", null, null, null);
        addDataEntry(data, "0051", 1.00, "Sägemodell", null, null, null);

        if (formData.facebow==="true") {
            // with Gesichtsbogen: always 2 split-cast sockets
            addDataEntry(data, "*0015", 2.00, "Split-Cast Sockel an Modell", null, null, null);
            addDataEntry(data, "*0404", 1.00, "Montage eines Mod. In individ. Artikulat Artikulator I", null, null, null);
            // Gegenkiefermodell only for digital
            const countGegenKieferModel = formData.digital === "digital" ? 1 : 0;
            addDataEntry(data, "*0407", countGegenKieferModel, "Montage Gegenkiefermodell", null, null, null);
            addDataEntry(data, "*0408", 1.00, "Einstellen nach Registrat", null, null, null);
        
        } else {
            // without Gesichtsbogen: 1 mittelwertartikulator
            // note: there is an additional piece of logic in the Excel sheet checking that at least one KM/ BM tooth is selected
            // the result is always 1 though so it doesn't seem to matter
            addDataEntry(data, "0120", 1.00, "Mittelwertartikulator", null, null, null);
        }
        
        addDataEntry(data, "*1012", teethWithKM, "Krone für Vollverblendung", null, null, null);
        if (teethWithBM>0)
            addDataEntry(data, "*1100", teethWithBM, "Brückenglied", null, null, null);

        addDataEntry(data, "*6202", teethWithBM + teethWithKM, "Vollverblendung Keramik", null, null, null);
        addDataEntry(data, "9700", teethWithBM + teethWithKM, "Verarbeitungsaufwand NEM-Legierung", null, null, null);
        let countShippingCost = 4;
        if (formData.facebow==="false" && teethWithBM + teethWithKM < 2)
            countShippingCost = 2;

        addDataEntry(data, "9330", countShippingCost, "Versandkosten", null, null, null);
        addDataEntry(data, "*6203", countShippingCost, "Zuschlag je Versandgang Logistikpausch.", null, null, null);

    }

    //Metallkeramik teilverblendet
    const teethWithKV = countTeeth(formData, ["KV"], null);
    const teethWithBV = countTeeth(formData, ["BV"], null);
    const sumTeethKVBV = teethWithKV + teethWithBV;
    if (sumTeethKVBV > 0){
        addDataEntry(data, "", null, "---Metallkeramik teilverblendet---", null, null, null);
        addDataEntry(data, "0010", 2.00, "Modell", null, null, null);
        addDataEntry(data, "0051", 1.00, "Sägemodell", null, null, null);

        const countMittelwertArtikulator = sumTeethKVBV >=2 ? 2 : 1;
        addDataEntry(data, "0120", countMittelwertArtikulator, "Mittelwertartikulator", null, null, null);
        if (teethWithKV > 0)
            addDataEntry(data, "1024", teethWithKV, "Krone für Vestibuläre Verblendung", null, null, null);
        if (teethWithBV)
            addDataEntry(data, "1100", teethWithBV, "Brückenglied", null, null, null);

        addDataEntry(data, "1620", sumTeethKVBV, "Vestibuläre Verblendung Keramik", null, null, null);
        addDataEntry(data, "9700", sumTeethKVBV, "Verarbeitungsaufwand NEM-Legierung", null, null, null);
        const countShippingCostTV = teethWithBV >=1 ? 4 : teethWithKV >= 1 ? 2 : 0; 
        addDataEntry(data, "9330", countShippingCostTV, "Versandkosten", null, null, null);
    }

    //Metallkeramik Vollgusskrone
    const teethWithK = countTeeth(formData, ["K"], null);
    if (teethWithK){
        addDataEntry(data, "", null, "---Metallkeramik Vollgusskrone---", null, null, null);
        addDataEntry(data, "0010", 2.00, "Modell", null, null, null);
        addDataEntry(data, "0051", 1.00, "Sägemodell", null, null, null);
        addDataEntry(data, "0120", 1.00, "Mittelwertartikulator", null, null, null);
        addDataEntry(data, "1021", teethWithK, "Vollkrone/Metall", null, null, null);
        addDataEntry(data, "9700", teethWithK, "Verarbeitungsaufwand NEM-Legierung", null, null, null);
        addDataEntry(data, "9330", 2.00, "Versandkosten", null, null, null);
    }
    

    
    
    return data;
}

const generateQuoteCeramics = (data, formData) => {


    addDataEntry(data, "*0732", 1.00, "Eingangsdesinfektion je Eingang", null, null, null);
    addDataEntry(data, "0010", 2.00, "Modell", null, null, null);
    addDataEntry(data, "0023", 1.00, "Verwendung von Kunststoff", null, null, null);
    addDataEntry(data, "0051", 1.00, "Sägemodell", null, null, null);
    addDataEntry(data, "0120", 1.00, "Mittelwertartikulator", null, null, null);

    const teethWithK = countTeeth(formData, ["K"], null);
    const teethWithV = countTeeth(formData, ["V"], null);
    const teethWithIK = countTeeth(formData, ["IK"], null);
    const teethWithIK3 = countTeeth(formData, ["IK3"], null);
    const teethWithTK = countTeeth(formData, ["TK"], null);

    if (teethWithK > 0)
        addDataEntry(data, "*1122", teethWithK, "IPS E-Max Krone", null, null, null);
    if (teethWithV > 0)
        addDataEntry(data, "*1127", teethWithV, "IPS E-Max Veneer", null, null, null);
    if (teethWithIK > 0)
        addDataEntry(data, "*1125", teethWithIK, "IPS E-Max Inlay 1-2-flächig", null, null, null);
    if (teethWithIK3 > 0)
        addDataEntry(data, "*1126", teethWithIK3, "IPS E-Max Inlay 3 oder Mehrflächig", null, null, null);
    if (teethWithTK > 0)
        addDataEntry(data, "*1124", teethWithTK, "IPS E-Max Teilkrone", null, null, null);
    const totalTeeth = teethWithK + teethWithV + teethWithIK + teethWithIK3 + teethWithTK;

    addDataEntry(data, "6931", totalTeeth, "IPS E-Max Press Multi Rohling", null, null, null);
    addDataEntry(data, "9330", 2.00, "Versandkosten", null, null, null);
    addDataEntry(data, "*6203", 2.00, "Zuschlag je Versandgang Logistikpausch.", null, null, null);
    return data;
}


const generateQuoteProsthetics = (data, isUpperJaw) => {

    if (isUpperJaw) {
        addDataEntry(data, "", null, "---Oberkiefer---", null, null, null);
        addDataEntry(data, "0010", 2, "Modell", 100, 120, 220);
        addDataEntry(data, "0120", 2, "Mittelwertartikulator", 100, 120, 220);
        addDataEntry(data, "0212", 1, "Funktionslöffel", 100, 120, 220);
        addDataEntry(data, "0213", 1, "Basis für Bissregistrierung", 100, 120, 220);
        addDataEntry(data, "0215", 1, "Basis für Aufstellung", 100, 120, 220);
        addDataEntry(data, "0220", 1, "Bisswall", 100, 120, 220);
        addDataEntry(data, "3010", 1, "Aufstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3020", 14, "Aufstellen Wachs- oder Kunststoff je Zahn", 100, 120, 220);
        addDataEntry(data, "3610", 1, "Fertigstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3620", 14, "Fertigstellen je Zahn", 100, 120, 220);
        addDataEntry(data, "1921", 6, "Vitapan FZ", 100, 120, 220);
        addDataEntry(data, "1885", 8, "Lingoform SZ", 100, 120, 220);
    } else {
        addDataEntry(data, "", null, "---Unterkiefer---", null, null, null);
        addDataEntry(data, "0010", 2, "Modell", 100, 120, 220);
        addDataEntry(data, "0212", 1, "Funktionslöffel", 100, 120, 220);
        addDataEntry(data, "0213", 1, "Basis für Bissregistrierung", 100, 120, 220);
        addDataEntry(data, "0215", 1, "Basis für Aufstellung", 100, 120, 220);
        addDataEntry(data, "0220", 1, "Bisswall", 100, 120, 220);
        addDataEntry(data, "3010", 1, "Aufstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3020", 14, "Aufstellen Wachs- oder Kunststoff je Zahn", 100, 120, 220);
        addDataEntry(data, "3610", 1, "Fertigstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3620", 14, "Fertigstellen je Zahn", 100, 120, 220);
        addDataEntry(data, "1921", 6, "Vitapan FZ", 100, 120, 220);
        addDataEntry(data, "1885", 8, "Lingoform SZ", 100, 120, 220);
        addDataEntry(data, "9330", 8, "Versandkosten", 100, 120, 220);
        addDataEntry(data, "6203", 8, "Zuschlag je Versandgang Logistikpausch.", 100, 120, 220);
    }

    return data;
}

const generateQuoteProstheticsMetal = (data, isUpperJaw) => {
    if (isUpperJaw) {
        addDataEntry(data, "", null, "---Oberkiefer---", null, null, null);
        addDataEntry(data, "0010", 2, "Modell", 100, 120, 220);
        addDataEntry(data, "0212", 1, "Funktionslöffel", 100, 120, 220);
        addDataEntry(data, "0213", 1, "Basis für Bissregistrierung", 100, 120, 220);
        addDataEntry(data, "0215", 1, "Basis für Aufstellung", 100, 120, 220);
        addDataEntry(data, "0220", 1, "Bisswall", 100, 120, 220);
        addDataEntry(data, "2010", 1, "Metallbiss", 100, 120, 220);
        addDataEntry(data, "3010", 1, "Aufstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3020", 14, "Aufstellen Wachs- oder Kunststoff je Zahn", 100, 120, 220);
        addDataEntry(data, "3410", 14, "Übertragung je Zahn", 100, 120, 220);
        addDataEntry(data, "3610", 1, "Fertigstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3620", 14, "Fertigstellen je Zahn", 100, 120, 220);
        addDataEntry(data, "3840", 10, "Zahn zahnfarben hinterlegt", 100, 120, 220);
        addDataEntry(data, "1921", 6, "Vitapan FZ", 100, 120, 220);
        addDataEntry(data, "1885", 8, "Lingoform SZ", 100, 120, 220);
    } else {
        addDataEntry(data, "", null, "---Unterkiefer---", null, null, null);
        addDataEntry(data, "0010", 2, "Modell", 100, 120, 220);
        addDataEntry(data, "0212", 1, "Funktionslöffel", 100, 120, 220);
        addDataEntry(data, "0213", 1, "Basis für Bissregistrierung", 100, 120, 220);
        addDataEntry(data, "0215", 1, "Basis für Aufstellung", 100, 120, 220);
        addDataEntry(data, "0220", 1, "Bisswall", 100, 120, 220);
        addDataEntry(data, "2010", 1, "Metallbiss", 100, 120, 220);
        addDataEntry(data, "3010", 1, "Aufstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3020", 14, "Aufstellen Wachs- oder Kunststoff je Zahn", 100, 120, 220);
        addDataEntry(data, "3410", 14, "Übertragung je Zahn", 100, 120, 220);
        addDataEntry(data, "3610", 1, "Fertigstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3620", 14, "Fertigstellen je Zahn", 100, 120, 220);
        addDataEntry(data, "3840", 10, "Zahn zahnfarben hinterlegt", 100, 120, 220);
        addDataEntry(data, "1921", 6, "Vitapan FZ", 100, 120, 220);
        addDataEntry(data, "1885", 8, "Lingoform SZ", 100, 120, 220);

        addDataEntry(data, "9330", 8, "Versandkosten", 100, 120, 220);
    }
    return data;
}

const generateQuoteProstheticsInterim = (data, isUpperJaw, formData) => {

    // TODO: check this with Laufer. It feels unintuitive that you'd need 2 models if you only have one jaw
    const countModels = formData.upperJaw === "Interimsprosthetics" && formData.lowerJaw === "Interimsprosthetics"  ? 1 : 2;
    if (isUpperJaw) {  
        addDataEntry(data, "", null, "---Oberkiefer---", null, null, null);
        addDataEntry(data, "0010", countModels, "Modell", 100, 120, 220);
        addDataEntry(data, "0120", 1, "Mittelwertartikulator", 100, 120, 220);
        addDataEntry(data, "3010", 1, "Aufstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3020", 14, "Aufstellen Wachs- oder Kunststoff je Zahn", 100, 120, 220);
        addDataEntry(data, "3610", 1, "Fertigstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3620", 14, "Fertigstellen je Zahn", 100, 120, 220);
        addDataEntry(data, "1921", 6, "Vitapan FZ", 100, 120, 220);
        addDataEntry(data, "1885", 8, "Lingoform SZ", 100, 120, 220);
        addDataEntry(data, "9330", 2, "Versandkosten", 100, 120, 220);
    } else {
        addDataEntry(data, "", null, "---Unterkiefer---", null, null, null);
        addDataEntry(data, "0010", countModels, "Modell", 100, 120, 220);
        addDataEntry(data, "0120", 1, "Mittelwertartikulator", 100, 120, 220);
        addDataEntry(data, "3010", 1, "Aufstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3020", 14, "Aufstellen Wachs- oder Kunststoff je Zahn", 100, 120, 220);
        addDataEntry(data, "3610", 1, "Fertigstellung Grundeinheit", 100, 120, 220);
        addDataEntry(data, "3620", 14, "Fertigstellen je Zahn", 100, 120, 220);
        addDataEntry(data, "1921", 6, "Vitapan FZ", 100, 120, 220);
        addDataEntry(data, "1885", 8, "Lingoform SZ", 100, 120, 220);
        addDataEntry(data, "9330", 2, "Versandkosten", 100, 120, 220);
    }
    return data;
}

const generateQuoteProstheticsInterimClamp = (data, isUpperJaw, formData) => {

    // for the prosthetics with a clamp we have to count the teeth with E and H
    const teethWithE = countTeeth(formData, ["E"], isUpperJaw);
    const teethWithH = countTeeth(formData, ["H"], isUpperJaw);
    const teethForVitaPan = countTeeth(formData, ["E"], isUpperJaw);
    

    if (isUpperJaw) {  
        // Upper Jaw
        addDataEntry(data, "", null, "---Oberkiefer---", null, null, null);
    } else {
        addDataEntry(data, "", null, "---Unterkiefer---", null, null, null);
    }
    addDataEntry(data, "0010", 2, "Modell", 100, 120, 220);
    addDataEntry(data, "0120", 1, "Mittelwertartikulator", 100, 120, 220);
    addDataEntry(data, "3010", 1, "Aufstellung Grundeinheit", 100, 120, 220);
    if (teethWithE > 0) {
        addDataEntry(data, "3020", teethWithE, "Aufstellen Wachs- oder Kunststoff je Zahn", 100, 120, 220);
    }
        addDataEntry(data, "3610", 1, "Fertigstellung Grundeinheit", 100, 120, 220);
    if (teethWithE > 0) {
        addDataEntry(data, "3620", teethWithE, "Fertigstellen je Zahn", 100, 120, 220);
    }
    if (teethWithH > 0) {
        addDataEntry(data, "3800", teethWithH, "Einfache gebogene Halte-/Stütze- Vorrichtung", 100, 120, 220);
    }
    if (teethForVitaPan > 0) {
        addDataEntry(data, "1921", teethForVitaPan, "Vitapan FZ", 100, 120, 220);
    }
    const teethForLingoForm = isUpperJaw ? [18,17,16,15,14,24,25,26,27,28] : [48,47,46,45,44,34,35,36,37,38];
    const countTeethForLingoForm = countTeeth(formData, ["E"], isUpperJaw, teethForLingoForm);
    if (countTeethForLingoForm > 0) {
        addDataEntry(data, "1885", countTeethForLingoForm, "Lingoform SZ", 100, 120, 220);
    }
    addDataEntry(data, "9330", 2, "Versandkosten", 100, 120, 220);
    return data;
}

const countTeethAnyLetter = (formData) => {
    let teeth = 0;
    return Object.values(formData.teeth).reduce((sum, item) => {
        if (item.value !== "") {
            return sum + 1;
        }
        return sum;
    }, 0);
}

const countTeeth = (formData, letters=[], isUpperJaw, teethRange=[]) => {
    // letter: E or H or any other identifier
    // teethRange: array to test, e.g. [18,19,20,21,22,23,24,25,26]
    let teeth = 0;
    // console.log(formData);
    if (teethRange.length > 0) {
        // check if specific teeth have the letter
        teethRange.forEach((toothId) => {
            const tooth = formData.teeth[toothId];
            if (tooth){
                if (letters.includes(tooth.value)) {
                    teeth += 1;
                }
            }
        });
    } else {
        // count teeth with the letter for the whole upper or lower jaw 
        Object.keys(formData.teeth).forEach((toothId) => {
            const tooth = formData.teeth[toothId];
            if (letters.includes(tooth.value)) {
                if (isUpperJaw !== null) {
                    // if the isUpperJaw flag is set check if it matches
                    if (tooth.isUpperJaw === isUpperJaw) {
                        teeth += 1;
                    }
                } else {
                    // if the isUpperJaw flag is set to null count all teeth
                    teeth += 1;
                }
                
            }
        });
    }

    return teeth;
}

const generateQuoteSplint = (data, isUpperJaw, formData) => {
    
    const stringAufbissMit = "Aufbiss- mit adjust. OF";
    const stringAufbissOhne = "Aufbiss- ohne adjust. OF";
    const aufbissMit = (isUpperJaw && formData.upperJaw === stringAufbissMit) || (!isUpperJaw && (formData.lowerJaw === stringAufbissMit));
    const aufbissOhne = (isUpperJaw && formData.upperJaw === stringAufbissOhne) || (!isUpperJaw && (formData.lowerJaw === stringAufbissOhne));

    if (aufbissMit || aufbissOhne) {

        if (isUpperJaw) {  
            addDataEntry(data, "", null, "---Oberkiefer---", null, null, null);
        } else {
            addDataEntry(data, "", null, "---Unterkiefer---", null, null, null);
        }

        addDataEntry(data, "0010", 3.00, "Modell", null, null, null);
        addDataEntry(data, "0021", 1.00, "Doublieren eines Modells", null, null, null);
        if (aufbissMit){

            addDataEntry(data, "0120", 1.00, "Mittelwertartikulator", null, null, null);
            addDataEntry(data, "4010", 1.00, "Aufbissbehelf m. adj. Oberfläche", null, null, null);
            addDataEntry(data, "7100", 2.00, "Aufbiss", null, null, null);
        } else {
            addDataEntry(data, "4020", 1.00, "Aufbissbehelf o. adj. Oberfläche", null, null, null);
        }
        addDataEntry(data, "9330", 2.00, "Versandkosten", null, null, null);
    }
    
    return data;
}