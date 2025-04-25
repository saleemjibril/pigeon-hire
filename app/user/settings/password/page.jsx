"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stage, setStage] = useState(1);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password">
      <div className="settings-contact__inner__header">
        <div>Password and Security</div>
        {stage === 1 && <div className="pointer" onClick={() => setStage(2)}>
          <Image alt="" width={50} height={18} src={"/assets/icons/edit.svg"} />
        </div>}
      </div>

      {stage === 1 && <div className="password__group">
        <label htmlFor="">Password:</label>
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
      </div>
}
{stage === 2 && <>
      <div className="password__disclaimer">
        <Image alt="" width={16} height={16} src={"/assets/icons/info.svg"} />
        <div>To protect your account, please complete this verification.</div>
      </div>

      <div className="password__grid">
        <div>Email:</div>
        <div>Sh**********@shell.com</div>
      </div>

      <div className="password__group">
        <label htmlFor="">Verification code:</label>
        <OutlinedInput
          className="password__group__input"
          required
          id="text"
          name="text"
          type={"text"}
          placeholder="6 digits"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
<br />
      <div className="password__verification-info">
        <Image alt="" width={16} height={16} src={"/assets/icons/verification.svg"} />
        <div>
          A verification code has been sent to your email and will be valid for
          60 seconds. Please keep it confidential.
        </div>
      </div>

      <button className="password__submit-button"
      onClick={() => setStage(3)}
      >Submit</button>
      <div className="password__not-received">
      Code not received? <span>Click here.</span>
</div>
</>}

{stage === 3 && <>
<div className="password__group">
        <label htmlFor="">New password:</label>
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
      </div>
<br />
      <div className="password__group">
        <label htmlFor="">Confirm password:</label>
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
      </div>
      <br />
      <br />

      <div className="settings-contact__button-group">
                <button
                onClick={() => setStage(1)}
                >Cancel</button>
                <button
                onClick={() => setStage(1)}
                >Save changes</button>
            </div>
            </>}

    </div>
  );
}
