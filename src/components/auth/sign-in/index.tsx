import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Box,
  Typography,
  Link,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { closeDialogAuthState, onDialogOtherState } from "../../../store/slice";
import { RootState } from "../../../store";
import axios from "axios";
import { API_ENDPOINT } from "../../../apis/api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00AA00",
    },
  },
});

interface Errors {
  email?: string;
  password?: string;
}

const SignInDialog: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogAuthState = useSelector(
    (state: RootState) => state.auth.dialogAuthState
  );

  const handleToggleMode = () => {
    dispatch(onDialogOtherState());
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    // Email validation
    if (!email) newErrors.email = "Email should not be empty";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email must be a valid email";

    // Password validation
    if (!password) newErrors.password = "Password should not be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post(API_ENDPOINT.SIGNIN, {
        email: email,
        password: password,
      });

      if (res.data) {
        const decoded: any = jwtDecode(res.data.data.access_token);
        sessionStorage.setItem("access_token", res.data.data.access_token);

        sessionStorage.setItem("role", decoded.role);
        sessionStorage.setItem("fullName", decoded.fullName);
        sessionStorage.setItem("status", decoded.fullName);
        sessionStorage.setItem("address", decoded.address);
        sessionStorage.setItem("email", decoded.email);
        sessionStorage.setItem("phone", decoded.phone);
        sessionStorage.setItem("createAt", decoded.fullName);
        // console.log(res)
        // Sử dụng Ant Design message thay vì toast
        localStorage.setItem("role", decoded.role);

        message.success("Đăng nhập thành công!");
        if (decoded.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }

        // Đóng Dialog
        // dispatch(closeDialogAuthState());
        window.location.reload();
      }
    } catch (error) {
      console.log("Login failed: ", error);
      message.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  };

  const handleClose = () => {
    dispatch(closeDialogAuthState());
  };

  return (
    <Dialog
      open={dialogAuthState}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <Stack p={2}>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Sign in
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            gap={0.5}
          >
            Don't have an account?
            <Link
              component="button"
              variant="body2"
              onClick={handleToggleMode}
              underline="hover"
              color="#f31221"
            >
              Sign up
            </Link>
          </Typography>
          <Box
            component="form"
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <StyledTextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
            />
            <Link
              component="button"
              variant="body2"
              align="left"
              color="secondary"
              sx={{
                mt: -1,
                cursor: "pointer",
                textDecoration: "none",
                color: "#f31221",
              }}
              onClick={() =>
                message.info("Forgot password functionality not implemented")
              }
            >
              Forgot password?
            </Link>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", px: 3 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              width: "100%",
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "#f31221",
            }}
          >
            Sign in
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default SignInDialog;
