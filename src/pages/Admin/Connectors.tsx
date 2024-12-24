import React from "react";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";

function Connectors() {
  return (
    <RoleBasedGaurd roles={["Admin", "SuperAdmin"]}>
      <div>Connectors</div>;
    </RoleBasedGaurd>
  );
}

export default Connectors;
