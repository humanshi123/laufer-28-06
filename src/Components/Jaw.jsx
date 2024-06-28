import React from "react";
import Tooth from "./Tooth";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "50px",
    alignItems: "center",
    width:  "100%",
  },
  tableContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
  },
  rowHeader: {
    width: "50px",
    textAlign: "center",
    padding: "10px",
  },
  quadrant: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "10px",
    flex: 1,
    // width: "100%",
  },
  table: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  tableElement: {
    width: "100%",
  },
  "@media (max-width: 768px)": {
    row: {
      flexDirection: "column",
    },
    rowHeader: {
      width: "100%",
    },
  },
};

function isProsthetics(formData, isUpperJaw) {
  const jaw = isUpperJaw ? "upperJaw" : "lowerJaw";
  return formData.typework === "Prothesen" && !(["", "Interimsprosthetics_clamp"].includes(formData[jaw]));
}

function Jaw({ formData, onChange, editable }) {
  const isProstheticsUpperJaw = isProsthetics(formData, true);
  const isProstheticsLowerJaw = isProsthetics(formData, false);

  return (
    <div style={styles.container}>
      <div style={styles.table}>
        <div style={styles.quadrant}>
          {/* <div style={styles.rowHeader}>OK</div> */}
          <table className="table-jaw" style={styles.tableElement}>
            <tbody>
              <tr style={styles.row}>
                <td className="tooth-td" style={styles.jawName}>OK</td>
                {Array.from({ length: 8 }, (_, i) => 18 - i).map((id) => (
                  <Tooth
                    key={id}
                    ID={id.toString()}
                    isUpperJaw={true}
                    isProsthetics={isProstheticsUpperJaw}
                    onChange={onChange}
                    initialValue={formData.teeth && formData.teeth[id] ? formData.teeth[id]: ""}
                    editable={editable}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
      
        <div style={styles.quadrant}>
          {/* <div style={styles.rowHeader}>OK</div> */}
          <table style={styles.tableElement}>
            <tbody>
              <tr style={styles.row}>
                {Array.from({ length: 8 }, (_, i) => 21 + i).map((id) => (
                  <Tooth
                    key={id}
                    ID={id.toString()}
                    isUpperJaw={true}
                    isProsthetics={isProstheticsUpperJaw}
                    onChange={onChange}
                    editable={editable}
                  />
                ))}
                <td className="tooth-td" style={styles.jawName}>OK</td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div style={styles.table}>
        <div style={styles.quadrant}>
          {/* <div style={styles.rowHeader}>UK</div>   */}
          <table style={styles.tableElement}>
            <tbody>

              <tr style={styles.row}>
                <td className="tooth-td" style={styles.jawName}>UK</td>
                {Array.from({ length: 8 }, (_, i) => 48 - i).map((id) => (
                  <Tooth
                    key={id}
                    ID={id.toString()}
                    isUpperJaw={false}
                    isProsthetics={isProstheticsLowerJaw}
                    onChange={onChange}
                    editable={editable}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div style={styles.quadrant}>
          {/* <div style={styles.rowHeader}>UK</div> */}
          <table style={styles.tableElement}>
            <tbody>
              <tr style={styles.row}>
                {Array.from({ length: 8 }, (_, i) => 31 + i).map((id) => (
                  <Tooth
                    key={id}
                    ID={id.toString()}
                    isUpperJaw={false}
                    isProsthetics={isProstheticsLowerJaw}
                    onChange={onChange}
                    editable={editable}
                  />
                ))}
              <td className="tooth-td" style={styles.jawName}>UK</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Jaw;
