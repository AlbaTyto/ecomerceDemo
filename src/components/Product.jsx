import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils/toast';

const Article = styled.article`
  background-color: ${({ theme }) => theme.bgLighter};
  margin: 5px;
  border-radius: 10px;
  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => theme.textSoft};
  }
`;
const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bgLighter};
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.625rem;
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.bg};
  &:hover {
    transform: scale(1.1);
  }
`;
const Price = styled.div`
  font-size: 1.3rem;
  color: black;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.bg};
`;
const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleClick = () => {
    try {
      dispatch(addProduct({ ...product, quantity }));
      setQuantity(1);
      handleSuccess("added");
    } catch (error) {
      console.log(error)
      handleError(error);
    }
  };
  return (
    <Article>
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: 'none' }}
      >
        <Container>
          <Circle />
          <Image src={product.imgUrl} />
        </Container>
      </Link>
      <IconContainer>
        <Price>${product.price}</Price>
        <Icon onClick={handleClick}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <StyledLink
            to={`/product/${product._id}`}
            style={{
              textDecoration: 'none',
            }}
          >
            <SearchOutlined />
          </StyledLink>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </IconContainer>
    </Article>
  );
};

export default Product;
