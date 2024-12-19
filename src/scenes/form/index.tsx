import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { API_ENDPOINT } from "../../apis/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate()


  const convertStringToBoolean = (payload: Record<string, any>) => {
    return Object.keys(payload).reduce((acc, key) => {
      const value = payload[key];
      // Kiểm tra nếu giá trị là chuỗi "true" hoặc "false"
      if (value === "true") {
        acc[key] = true;
      } else if (value === "false") {
        acc[key] = false;
      } else {
        acc[key] = value; // Giữ nguyên các giá trị khác
      }
      return acc;
    }, {} as Record<string, any>);
  };

  const createProduct = async (value: any) => {
    try {
      const res = await axios.post(API_ENDPOINT.FETCH_PRODUCTS,value)
      if(res.data){
        toast.info('Add product success!')
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormSubmit = (values:any) => {
    console.log(values);
    createProduct(convertStringToBoolean(values))
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New Product" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_name}
                name="Product_name"
                error={!!touched.Product_name && !!errors.Product_name}
                helperText={touched.Product_name && errors.Product_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product SKU ***"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_sku}
                name="Product_sku"
                error={!!touched.Product_sku && !!errors.Product_sku}
                helperText={touched.Product_sku && errors.Product_sku}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_description}
                name="Product_description"
                error={!!touched.Product_description && !!errors.Product_description}
                helperText={touched.Product_description && errors.Product_description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product image link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_images}
                name="Product_images"
                error={!!touched.Product_images && !!errors.Product_images}
                helperText={touched.Product_images && errors.Product_images}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product currency"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_currency}
                name="Product_currency"
                error={!!touched.Product_currency && !!errors.Product_currency}
                helperText={touched.Product_currency && errors.Product_currency}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product color"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_color}
                name="Product_color"
                error={!!touched.Product_color && !!errors.Product_color}
                helperText={touched.Product_color && errors.Product_color}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Size"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_size}
                name="Product_size"
                error={!!touched.Product_size && !!errors.Product_size}
                helperText={touched.Product_size && errors.Product_size}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Product count"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_count}
                name="Product_count"
                error={!!touched.Product_count && !!errors.Product_count}
                helperText={touched.Product_count && errors.Product_count}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Product price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_price}
                name="Product_price"
                error={!!touched.Product_price && !!errors.Product_price}
                helperText={touched.Product_price && errors.Product_price}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product isNewArrival"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_isNewArrival}
                name="Product_isNewArrival"
                error={!!touched.Product_isNewArrival && !!errors.Product_isNewArrival}
                helperText={touched.Product_isNewArrival && errors.Product_isNewArrival}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product isBestSeller"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_isBestSeller}
                name="Product_isBestSeller"
                error={!!touched.Product_isBestSeller && !!errors.Product_isBestSeller}
                helperText={touched.Product_isBestSeller && errors.Product_isBestSeller}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product isOnSale"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Product_isOnSale}
                name="Product_isOnSale"
                error={!!touched.Product_isOnSale && !!errors.Product_isOnSale}
                helperText={touched.Product_isOnSale && errors.Product_isOnSale}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="categoryId"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categoryId}
                name="categoryId"
                error={!!touched.categoryId && !!errors.categoryId}
                helperText={touched.categoryId && errors.categoryId}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  Product_name: yup.string().required("required"),
  Product_sku: yup.string().required("required"),
  Product_description: yup.string().required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  Product_currency: yup.string().required("required"),
  Product_color: yup.string().required("required"),
  Product_size: yup.string().required("required"),
  Product_variantSku: yup.string(),
  Product_specifications: yup.string(),
  Product_price: yup.number().required("required"),
  Product_rating: yup.string(),
  Product_count: yup.number().required("required"),
  Product_isNewArrival: yup.boolean().required("required"),
  Product_isBestSeller: yup.boolean().required("required"),
  Product_isOnSale: yup.boolean().required("required"),
  Product_images: yup.string().required("required"),
  categoryId:yup.string()
});
const initialValues = {
  Product_name: "",
  Product_sku: "",
  Product_description: "",
  Product_currency: "",
  Product_color: "",
  Product_size: "",
  Product_variantSku:"",
  Product_specifications:"",
  Product_price:"",
  Product_count:"",
  Product_images:"",
  Product_isNewArrival:false,
  Product_isBestSeller:false,
  Product_isOnSale:false,
  categoryId:"672f122c0ec995f2486328c4",
};

export default Form;
