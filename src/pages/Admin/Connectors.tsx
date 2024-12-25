import React from "react";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";
import { showToast } from "src/utils/Toast";

function Connectors() {
  return (
    <RoleBasedGaurd roles={["Admin", "SuperAdmin"]}>
      <div onClick={() => showToast.success("Login successful!")}>
        Connectors
      </div>
      ;
    </RoleBasedGaurd>
  );
}

export default Connectors;
