import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Faker from 'faker';

const PhotoBoothBody = styled.div`
  width: 400px;
  height: 558px;
  background-color: #152d35;

  display: flex ;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BtnOutlined = styled.div`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #dcc7be;

  min-width: 50px;
  width: 46%;

  color: #dcc7be;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* position: absolute;
  bottom: -30px; */

  &:hover {
      background-color: #dcc7be;
      color: #152d35;
      cursor: pointer;
  }
`;

const PhotoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  padding: 20px;
`;

const SelfPhoto = styled.div`
  background-image: linear-gradient(to right, #2F333569 , #1C3F4B79);
  border-radius: 10px;

  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;

  object-fit: cover;

  

  align-self: center;
  justify-self: center;
  
`

const PhotoElement = styled.div`
  height: 80px;
  background-image: linear-gradient(to right, #2F333569 , #1C3F4B79);
  border-radius: 10px;
`;

const PhotoBooth = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        style={{ backgroundColor: "#2121217E" }}
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <PhotoBoothBody >
          <PhotoGrid>
            <PhotoElement >
                <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover" }} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <SelfPhoto >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </SelfPhoto>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be", objectFit: "cover"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
            <PhotoElement >
            <img src={Faker.image.avatar()} style={{borderRadius: "10px", border: "1px solid #dcc7be"}} alt={Faker.name.findName()}></img>
            </PhotoElement>
          </PhotoGrid>

         
        </PhotoBoothBody>
        <div className="d-flex flex-row align-items-center justify-content-around py-3" style={{backgroundColor: "#152d35"}}>
        <BtnOutlined>Take snap</BtnOutlined>
        <BtnOutlined onClick={handleClose}>Close</BtnOutlined>
        </div>
      </Dialog>
    </>
  );
};

export default PhotoBooth;
