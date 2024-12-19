import { FC, ReactElement, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReviewsIcon from "@mui/icons-material/RateReview";
import ArticleIcon from "@mui/icons-material/Article";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { toast } from "react-toastify";

interface TItemProps {
  title: string;
  to: string;
  icon: ReactElement;
  selected: string;
  setSelected: (title: string) => void;
}

const Item: FC<TItemProps> = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      <a href={to}></a>
    </MenuItem>
  );
};

const Sidebar: FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userInfo, setUserInfo] = useState<{
    name: string;
    role: string;
    avatar: string;
  }>({
    name: "Admin",
    role: "Administrator",
    avatar: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo({
        name: parsedUserInfo.email || "Admin",
        role: parsedUserInfo.role || "Administrator",
        avatar:
          parsedUserInfo.avatar ||
          "https://i.pinimg.com/originals/11/b4/04/11b40409f4192832c8a8124e253631d1.gif",
      });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("user_info");
    toast.info("Logout Success!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN PAGE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={
                    userInfo.avatar ||
                    "https://i.pinimg.com/originals/11/b4/04/11b40409f4192832c8a8124e253631d1.gif"
                  }
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center" mt={2}>
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                >
                  {userInfo.name}
                </Typography>
                <Typography variant="body2" color={colors.greenAccent[500]}>
                  {userInfo.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Category Management"
              to="/admin/category"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="User Management"
              to="/admin/users"
              icon={<GroupIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Product Management"
              to="/admin/products"
              icon={<ShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Order Management"
              to="/admin/orders"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Review Management"
              to="/admin/review"
              icon={<ReviewsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Blog Management"
              to="/admin/blog"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <MenuItem
              icon={<LogoutIcon />}
              onClick={handleLogout}
              style={{ color: colors.redAccent[500] }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
