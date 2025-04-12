"use client"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function DeactivationModal({open, setOpen}) {
      const [password, setPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [stage, setStage] = useState(1);

      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
  return (
    open && 
    <div className="deactivation-modal">
      {stage === 1 && <div className="deactivation-modal__inner">
        <Image
          alt=""
          width={80}
          height={80}
          src={"/assets/icons/error.svg"}
        />

        <div className="deactivation-modal__inner__title">Confirm Deactivation?</div>
        <div className="deactivation-modal__inner__subtitle">
        To confirm, enter your password
        </div>
        <label htmlFor="">Enter Password</label>
        <OutlinedInput
          className="password__group__input"
          required
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />

        <div className="deactivation-modal__inner__button-group">
            <button onClick={() => setStage(2)}>Cancel</button>
            <button onClick={() => setStage(2)}>Deactivate</button>
        </div>
      </div>}
      {stage === 2 && <div className="deactivation-modal__inner">
        <Image
          alt=""
          width={80}
          height={80}
          src={"/assets/icons/error.svg"}
        />

        <div className="deactivation-modal__inner__title">Deactivate account?</div>
        <div className="deactivation-modal__inner__subtitle">
        This is a permanent action. All data would be lost. Are you sure you want to continue?
        </div>
      

        <div className="deactivation-modal__inner__button-group-green">
            <button onClick={() => setOpen(false)}>Yes</button>
            <button onClick={() => setOpen(false)}>No</button>
        </div>
      </div>}
    </div>
  );
}
