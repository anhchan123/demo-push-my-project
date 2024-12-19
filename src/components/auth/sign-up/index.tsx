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
import {
  SignUp,
  closeDialogAuthState,
  onDialogOtherState,
} from "../../../store/slice";
import { RootState } from "../../../store";

export interface UserSignUp {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
}

interface Errors {
  email?: string;
  fullName?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  phone?: string;
}

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00AA00",
    },
  },
});

const SignUpDialog: React.FC = () => {
  // Combine all state values into a single object
  const [formData, setFormData] = useState<UserSignUp>({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch();
  const dialogOtherState = useSelector(
    (state: RootState) => state.auth.dialogOtherState
  );

  const handleToggleMode = () => {
    dispatch(onDialogOtherState());
  };

  const validate = () => {
    const newErrors: Errors = {};

    // Email validation
    if (!formData.email) newErrors.email = "Email should not be empty";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email must be a valid email";

    // Full Name validation
    if (!formData.fullName)
      newErrors.fullName = "Full Name should not be empty";

    // Password validation
    if (!formData.password) newErrors.password = "Password should not be empty";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    // Address validation
    if (!formData.address) newErrors.address = "Address should not be empty";

    // Phone validation
    if (!formData.phone) newErrors.phone = "Phone should not be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = { ...formData };
      dispatch<any>(SignUp(data));
    }
  };

  const handleClose = () => {
    dispatch(closeDialogAuthState());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog
      open={dialogOtherState}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <Stack p={2}>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Sign up
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            color="textSecondary"
            display="flex"
            gap={0.5}
          >
            Already have an account?
            <Link
              component="button"
              variant="body2"
              onClick={handleToggleMode}
              underline="hover"
              color="#f31221"
            >
              Sign in
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <StyledTextField
              label="Full Name"
              type="text"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
            />
            <StyledTextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <StyledTextField
              label="Address"
              type="text"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
            />
            <StyledTextField
              label="Phone"
              type="text"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
            />
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
            Sign up
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default SignUpDialog;
