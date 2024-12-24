import React from "react";
import RoleBasedGaurd from "src/auth/RoleBasedGaurd";

function OtherStorageDevices() {
  return (
    <RoleBasedGaurd roles={["Admin", "SuperAdmin"]}>
      <div>OtherStorageDevices</div>;
    </RoleBasedGaurd>
  );
}

export default OtherStorageDevices;
