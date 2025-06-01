import styled from "styled-components";
import { Link } from "react-router-dom";

const RestaurantWrapperEl = styled.div`
  position: relative;
  width: 350px;
  border: 2px solid black;
  border-radius: 7px 7px 0 0;
  display: flex;
  flex-direction: column;
  padding: 5px 7px;
  margin: auto;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const MenuItemWrapperEl = styled.div`
  position: relative;
  width: 350px;
  border: solid black;
  border-width: 0 2px 2px 2px;
  border-radius: 0 0 7px 7px;
  display: flex;
  flex-direction: column;
  padding: 5px 7px;
  margin: auto;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const LinkUnderline = styled(Link)`
  text-decoration:underline;
  margin-left:auto;
  margin-right: 10px
`;

export { RestaurantWrapperEl, MenuItemWrapperEl, ListItem, LinkUnderline };
