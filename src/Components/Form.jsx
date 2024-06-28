import React, { useState } from 'react';
import Description from "../Components/Description";
import Jaw from "../Components/Jaw";
import { useNavigate } from 'react-router-dom';

const style = {
    title: {
        fontSize: "24px",
        width: "100%",
        marginBottom: "20px",
    },
    quoteSection: {
        marginTop: "100px",
    },
    subHeading: {
        marginBottom: "20px"
    },
    checkbox: {
        borderRadius: "6px",
        // padding: "5px",
        border: "2px solid var(--Neutrals-400, #CBD2E0)",
    },
    checkboxField: {
        flexDirection: "row",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
    }
};

const Form = ({ handleChange, editable, initialFormData }) => {
    if (initialFormData === undefined) {
        initialFormData = {
            priceclass: '',
            hardshipcase: false,
            facebow: '',
            typework: '', 
            upperJaw: '',
            lowerJaw: '',
            digital: '',
            health: '',
            implant: '',
            material: '',
            vollantom: false,
            ios: false
        }
    };

    const [formData, setFormData] = useState(initialFormData);
   
    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        const { isUpperJaw, toothID } = e;

        let newFormData = { ...formData };
        if (name === "typework" && value === "Prothesen") {
            newFormData = { ...newFormData, material: "Kunststoff" };
        }

        if (type === "checkbox") {
            newFormData = { ...newFormData, [name]: checked };
        } else {
            newFormData = { ...newFormData, [name]: value };
        }
        if (toothID) {
            newFormData = {...newFormData, teeth: {...newFormData.teeth, [toothID]: {isUpperJaw, value}}};
        }
        setFormData(newFormData);
        handleChange(newFormData);

    };

    return (<div className='from-value'>
            <div className="grid grid-cols-3 gap-x-[38px]">
                <div className="flex flex-col">
                    <div className="form-field">
                        <label className="text-sm mb-[8px]">Preisklasse</label>
                        <select
                            className="border-field"
                            name="priceclass"
                            value={formData.priceclass}
                            onChange={handleInputChange}
                            disabled={!editable}
                        >
                            <option value="Preisgünstig">
                                Preisgünstig/ Laufer Zahntechnik
                            </option>
                            <option value="Exklusiv (BEL/KASSE)">
                                Exklusiv (BEL/KASSE)
                            </option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label className="text-sm mb-[8px]"></label>
                        <div className="field" style={style.checkboxField}>
                            Hardship cases/ 100%
                            <input
                                type="checkbox"
                                name="hardshipcase"
                                value="hardship"
                                style={style.checkbox}
                                checked={formData.hardshipcase}
                                onChange={handleInputChange}
                                disabled={!editable}
                            />
                        </div>
                    </div>
                    {formData.material === 'NEM' && (
                        <div className="form-field">
                            <label className="text-sm mb-[8px]">Gesichtsbogen</label>
                            <select
                                className="border-field"
                                name="facebow"
                                value={formData.facebow}
                                onChange={handleInputChange}
                                disabled={!editable}
                            >
                                <option value="true">Ja</option>
                                <option value="false">Nein</option>
                            </select>
                        </div>
                    )}
                    <div className="form-field">
                        <label className="text-sm mb-[8px]">Arbeitsart</label>
                        <select
                            className="border-field"
                            name="typework"
                            value={formData.typework}
                            onChange={handleInputChange}
                            disabled={!editable}
                        >
                            <option value=""></option>
                            <option value="Kronen- und Brückentechnik">Kronen- und Brückentechnik</option>
                            <option value="Schienen">Schienen</option>
                            <option value="Prothesen">Prothesen</option>
                            <option value="Teleskoparbeiten">Teleskoparbeiten</option>
                            <option value="Klammermodellguss">Klammermodellguss</option>
                            <option value="Geschiebe & Riegelarbeiten">
                                Geschiebe & Riegelarbeiten
                            </option>
                            <option value="Provisorium/ Reise- & Interimsproth.">
                                Provisorium/ Reise- & Interimsproth.
                            </option>
                        </select>
                    </div>
                    {formData.typework === 'Prothesen' && (
                        <div className="form-field">
                            <div>
                                <label className="text-sm mb-[8px]">
                                    Oberkiefer
                                    <select
                                        className="border-field"
                                        name="upperJaw"
                                        value={formData.upperJaw}
                                        onChange={handleInputChange}
                                        disabled={!editable}
                                    >
                                        <option value=""></option>
                                        <option value="Prosthetics">
                                            OK - Prothese incl. Löffel / Biss
                                        </option>
                                        <option value="Metalprosthetics">
                                            OK - Prothese incl. Löffel / Biss - mit Metallbasis
                                        </option>
                                        <option value="Interimsprosthetics">
                                            OK - Interimsprothese Totale
                                        </option>
                                        <option value="Interimsprosthetics_clamp">
                                            OK - Interimsprothese mit geb. Klammer
                                        </option>
                                        <option value="Coverdentureprosthetics">
                                            OK - Coverdentureprothese mit Metallbasis
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label className="text-sm mb-[8px]">
                                    Unterkiefer
                                    <select
                                        className="border-field"
                                        name="lowerJaw"
                                        value={formData.lowerJaw}
                                        onChange={handleInputChange}
                                        disabled={!editable}
                                    >
                                        <option value=""> </option>
                                        <option value="Prosthetics">
                                            UK - Prothese incl. Löffel / Biss
                                        </option>
                                        <option value="Metalprosthetics">
                                            UK - Prothese incl. Löffel / Biss - mit Metallbasis
                                        </option>
                                        <option value="Interimsprosthetics">
                                            UK - Interimsprothese Totale
                                        </option>
                                        <option value="Interimsprosthetics_clamp">
                                            UK - Interimsprothese mit geb. Klammer
                                        </option>
                                        <option value="Coverdentureprosthetics">
                                            UK - Coverdentureprothese mit Metallbasis
                                        </option>
                                    </select>
                                </label>
                            </div>
                    </div>
                    )}

                    {formData.typework === 'Schienen' && (
                        <div className="form-field">
                            <div>
                                <label className="text-sm mb-[8px]">
                                    Oberkiefer
                                    <select
                                        className="border-field"
                                        name="upperJaw"
                                        value={formData.upperJaw}
                                        onChange={handleInputChange}
                                        disabled={!editable}
                                    >
                                        <option value=""></option>
                                        <option value="Gedruckte Schiene">Gedruckte Schiene</option>
                                        <option value="Aufbiss- mit adjust. OF">
                                            Aufbiss- mit adjust. OF
                                        </option>
                                        <option value="Aufbiss- ohne adjust. OF">
                                            Aufbiss- ohne adjust. OF
                                        </option>
                                        <option value="TAP / Silensor">TAP / Silensor</option>
                                        <option value="Sportmundschutz">Sportmundschutz</option>
                                        <option value="Lerch-Schiene">Lerch-Schiene</option>
                                        <option value="Knirscherschiene">Knirscherschiene</option>
                                        <option value="Bleachingschiene">Bleachingschiene</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label className="text-sm mb-[8px]">
                                    Unterkiefer
                                    <select
                                        className="border-field"
                                        name="lowerJaw"
                                        value={formData.lowerJaw}
                                        onChange={handleInputChange}
                                        disabled={!editable}
                                    >
                                        <option value=""></option>
                                        <option value="Gedruckte Schiene">Gedruckte Schiene</option>
                                        <option value="Aufbiss- mit adjust. OF">
                                            Aufbiss- mit adjust. OF
                                        </option>
                                        <option value="Aufbiss- ohne adjust. OF">
                                            Aufbiss- ohne adjust. OF
                                        </option>
                                        <option value="TAP / Silensor">TAP / Silensor</option>
                                        <option value="Sportmundschutz">Sportmundschutz</option>
                                        <option value="Lerch-Schiene">Lerch-Schiene</option>
                                        <option value="Knirscherschiene">Knirscherschiene</option>
                                        <option value="Bleachingschiene">Bleachingschiene</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    )}
                    {['Zirkon', 'NEM'].includes(formData.material) && (
                        <div className="form-field">
                            <label className="text-sm mb-[8px]">Digital/ Konventionell</label>
                            <select
                                className="border-field"
                                name="digital"
                                value={formData.digital}
                                onChange={handleInputChange}
                                disabled={!editable}
                            >
                                <option value="digital">Digital</option>
                                <option value="Konventionell">Konventionell</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="form-field">
                        <label className="text-sm mb-[8px]"> Krankenkasse</label>
                        <input
                            className="border-field"
                            type="text"
                            name="health"
                            value={formData.health}
                            onChange={handleInputChange}
                            disabled={!editable}
                        />
                    </div>
                    <div className="form-field">
                        <label className="text-sm mb-[8px]"> Implantatsystem</label>
                        <input
                            className="border-field"
                            type="text"
                            name="implant"
                            value={formData.implant}
                            onChange={handleInputChange}
                            disabled={!editable}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="form-field">
                        <label className="text-sm mb-[8px] ctm_material_select">
                            Material
                        </label>
                    </div>

                    <div className="form-field">
                        <select
                            className="border-field"
                            name="material"
                            value={formData.material}
                            onChange={handleInputChange}
                            disabled={!editable}
                        >
                            <option value=""></option>
                            <option value="Zirkon">Zirkon</option>
                            <option value="NEM">NEM</option>
                            <option value="edelmetall">Edelmetall</option>
                            <option value="Presskeramik">Presskeramik</option>
                            <option value="Kunststoff">Kunststoff</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label className="text-sm mb-[8px]"></label>
                        <div className="field" style={style.checkboxField}>
                            Vollanatomisch
                            <input
                                type="checkbox"
                                name="vollantom"
                                value="vollantom"
                                style={style.checkbox}
                                onChange={handleInputChange}
                                disabled={!editable}
                            />
                        </div>
                    </div>
                    <div className="form-field">
                        <label className="text-sm mb-[8px]"></label>
                        <div className="field" style={style.checkboxField}>
                            IOS Model
                            <input
                                type="checkbox"
                                name="ios"
                                value="iosm"
                                style={style.checkbox}
                                onChange={handleInputChange}
                                disabled={!editable}
                            />
                        </div>
                    </div>
                </div>

            </div>
            { editable && (
            <p className='<div class="text-black text-xl font-normal' style={style.subHeading}>
                2. Zahnauswahl
            </p>
            )}
            <Jaw formData={formData} onChange={handleInputChange} editable={editable}/>
            <Description />
        </div>
    );
};

export default Form;
