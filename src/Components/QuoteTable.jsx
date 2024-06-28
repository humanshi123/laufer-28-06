import PropTypes from "prop-types";


const style = {
  container: {
    marginBottom: "50px"
  },
  sumMaterialRow: {
    marginTop: "40px",
  },
  numberField: {
    textAlign:"right", 
    minWidth: "110px"

  }
};

  
const QuoteTable = ({ tableData }) => {
  
  const {data} = tableData;
  console.log(data);
  if (tableData.exclusiv) {
    return <div style={style.container} >Für exklusive Angebote senden Sie bitte das ausgefüllte Formular ab. Wir werden uns in Kürze mit einem Kostenvoranschlag bei Ihnen melden.</div>;
  }
  if (!data || data.length === 0) {
    return <div style={style.container} >Für die gewählte Auswahl kann kein automatisierter Kostenvoranschlag generiert werden. Bitte passen Sie Ihre Auswahl an oder senden Sie das Formular ab. Wir werden uns in Kürze mit einem Kostenvoranschlag bei Ihnen melden.</div>;
  }
  const sumMaterials = data.reduce((partialSum, a) => partialSum + a.material, 0);
  const sumServices = data.reduce((partialSum, a) => partialSum + a.service, 0);
  const totalSum = sumMaterials + sumServices;
  const tax = (Math.round(totalSum * 0.19)).toFixed(2);
  const totalSumWithTax = parseInt(totalSum) + parseInt(tax);

  return (
    <table style={style.container} className="table-auto w-full mt-8">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Nummer</th>
          <th className="px-4 py-2 border">Menge</th>
          <th className="px-4 py-2 border" colSpan={6}>Bezeichung</th>
          <th className="px-4 py-2 border">E-Preis</th>
          <th className="px-4 py-2 border">Material</th>
          <th className="px-4 py-2 border">Leistung</th>
        </tr>
      </thead>
      <tbody>
        {data.map((element) => (
          <tr key={element}>
            <td className="border px-4 py-2">{element.number}</td>
            <td className="border px-4 py-2">{element.qty}</td>
            <td className="border px-4 py-2" colSpan={6}>{element.description}</td>
            <td className="border px-4 py-2" style={style.numberField}>{element.price ? parseFloat(element.price).toFixed(2) : ""}</td>
            <td className="border px-4 py-2" style={style.numberField}>{element.material ? parseFloat(element.material).toFixed(2) : ""}</td>
            <td className="border px-4 py-2" style={style.numberField}>{element.service ? parseFloat(element.service).toFixed(2) : ""}</td>
          </tr>
        ))}
        
       
        <tr className="px-4 py-2">
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={6}>Dieses Angebot gilt nur für die veranschlagte Konstruktion. Technische Anderungen und Mehrkosten sind
nicht berücksichtigt und werden zusätzlich berechnet. Die Materialkosten für
Edelmetall sind geschätzt und tagespreisabhängig. Die Gültigkeit des
Angebotes beträgt 3 Monate. Bitte weisen Sie bei Auftragserteilung auf den Kostenvoranschlag
hin. lrrtümer vorbehalten!</td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
        </tr>

        <tr className="px-4 py-2">
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={6}></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
        </tr>




        <tr className="px-4 py-2">
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={6}></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
        </tr>
        <tr className="px-4 py-2">
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={6}></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
        </tr>
        
        <tr className="px-4 py-2">
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={2}>Legierungen</td>
          <td className="px-4 py-2" colSpan={4}>{sumMaterials.toFixed(2) + " €"}</td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
        </tr>
        <tr>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={2}>Zähne</td> 
          <td className="px-4 py-2" colSpan={4}>{sumMaterials.toFixed(2) + " €"}</td>
          <td className="px-4 py-2" colSpan={2}>Summe Material</td>
          <td className="px-4 py-2" style={style.numberField}>{sumMaterials.toFixed(2) + " €"}</td>
        </tr>
        <tr className="divivder-row">
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={2}>Sonst. Material</td> 
          <td className="px-4 py-2" colSpan={4}>{sumMaterials.toFixed(2) + " €"}</td>
          <td className="px-4 py-2" colSpan={2}>Summe Leistungen</td>
          <td className="px-4 py-2" style={style.numberField}>{sumServices.toFixed(2) + " €"}</td>
        </tr>
        <tr>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={6}></td>
          <td className="px-4 py-2" colSpan={2}>Gesamtsumme</td>
          <td className="px-4 py-2" style={style.numberField}>{totalSum.toFixed(2) + " €"}</td>
        </tr>
        <tr>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={6}></td>
          <td className="px-4 py-2 divivder-row" colSpan={2} >zzgl. 19,00% MwSt.</td>
          <td className="px-4 py-2 divivder-row" style={style.numberField}>{tax + " €"}</td>
        </tr>
        <tr>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2" colSpan={6}></td>
          <td className="px-4 py-2 final-row" colSpan={2}>Endbetrag</td>
          <td className="px-4 py-2 final-row" style={style.numberField}>{totalSumWithTax.toFixed(2) + " €"}</td>
        </tr>
      </tbody>
    </table>
  );
};

QuoteTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default QuoteTable;
