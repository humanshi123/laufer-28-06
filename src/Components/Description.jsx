import React from 'react';

const Description = () => {
    return (
        <div className=''>
            <div className='grid grid-cols-3 gap-[20px] mb-[40px] text-[#898787]'>
            <div className='border-right-sec'>
                <ul>
                    <li>K = Vollgußkrone</li>
                    <li>B = Vollgußbrückenglied</li>
                    <li>KV/BV = Metalkeramik vestibulär verbl.</li>
                    <li>KM/BM = Metalkeramik vollverblendet	</li>
                    <li>V = Veneer	</li>
                    <li>IK = Inlay Keramik</li>
                    <li>IK3 = Inlay Keramik 3 oder mehrflächig</li>
                    <li>IG = Inlay Gold	</li>		
                </ul>
            </div>
            <div className='border-right-sec'>				
                <ul>
                    <li>T = Konus/Teleskopkrone	</li>
                    <li>TV = Konus/Teleskopkrone vestibulär verbl.</li>
                    <li>TM = Konus/Teleskopkrone vollverblendet</li>
                    <li>MG = Modellguß</li>
                    <li>CD = Coverdenture</li>
                    <li>IS = Implantatgetragene Suprakonstruktion</li>
                    <li>TK = Teilkrone</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>H = Klammer	</li>
                    <li>E = zu ersetzender Zahn		</li>
                    <li>O = Geschiebe/Verbindungsvorrichtung</li>
                    <li>St = Stiftaufbau</li>
                    <li>Sch = Schiene</li>
                </ul>
            </div>
            </div>
        </div>
    );
}

export default Description;
