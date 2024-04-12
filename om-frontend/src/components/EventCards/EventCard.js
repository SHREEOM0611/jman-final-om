import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MdEditSquare, MdDelete } from "react-icons/md";
import axios from "axios";
// import img1 from "../../Images/login-form-img-2.jpg";
import "./eventcard.css";

import { Link, useNavigate } from "react-router-dom";

const MediaCard = ({
  eventDetail,
  eventDetails,
  setEventDetails,
  isPast,
  isAdmin,
}) => {
  const navigate = useNavigate();

  const handleEdit = async () => {
    navigate(`/edit-event/${eventDetail._id}`);
  };

  // console.log("current-event: ", eventDetail);

  const handleDelete = async (e) => {
    const eventId = eventDetail._id;

    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-event/${eventId}`
      );
      console.log(response.data);

      const updatedEvents = eventDetails.filter(
        (event) => event._id !== eventId
      );

      // Update the state with the filtered array
      setEventDetails(updatedEvents);
    } catch (error) {
      console.log(`Error in deleting event ${eventDetail.name}: `, error);
    }
  };

  return (
    <>
      {isAdmin ? (
        <Card id="cards" className="event-card">
          <Link to={`/admin-page/event/${eventDetail._id}`}>
            <div className="event-image-container">
              <img
                src={eventDetail.imgUrl}
                alt="event-img"
                className="event-image"
              />
            </div>
          </Link>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="white">
              {eventDetail.name}
            </Typography>
            <Typography variant="body2" color="white">
              {eventDetail.description && eventDetail.description.length > 20
                ? eventDetail.description.slice(0, 2) + "..."
                : eventDetail.description}
            </Typography>
            <Typography variant="body2" color="white">
              Trainer name: {eventDetail.trainer}
            </Typography>
            <Typography variant="body2" color="white">
              Date: {eventDetail.date}
            </Typography>
            <Typography variant="body2" color="white">
              Time: {eventDetail.startTime} - {eventDetail.endTime}
            </Typography>
            <Typography variant="body2" color="white">
              Location: {eventDetail.location}
            </Typography>
          </CardContent>
          <CardActions className="justify-center m-3">
            {isPast ? (
              <>
                {/* <MdEditSquare
                onClick={handleEdit}
                className="card-icon"
                style={{ color: "#e500ff", cursor: "pointer" }}
              /> */}
              </>
            ) : (
              <>
                <MdEditSquare
                  onClick={handleEdit}
                  className="card-icon"
                  style={{ color: "#e500ff", cursor: "pointer" }}
                />
                <MdDelete
                  onClick={handleDelete}
                  style={{ color: "#8200ff", cursor: "pointer" }}
                />
              </>
            )}
          </CardActions>
        </Card>
      ) : (
        <Card id="cards" className="event-card">
          <Link to={`/event/${eventDetail._id}`}>
            <div className="event-image-container">
              <img
                src={eventDetail.imgUrl}
                alt="event-img"
                className="event-image"
              />
            </div>

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="white"
              >
                {eventDetail.name}
              </Typography>
              <Typography variant="body2" color="white">
                {eventDetail.description && eventDetail.description.length > 50
                  ? eventDetail.description.slice(0, 50) + "..."
                  : eventDetail.description}
              </Typography>
              <Typography variant="body2" color="white">
                Trainer name: {eventDetail.trainer}
              </Typography>
              <Typography variant="body2" color="white">
                Date: {eventDetail.date}
              </Typography>
              <Typography variant="body2" color="white">
                Time: {eventDetail.startTime} - {eventDetail.endTime}
              </Typography>
              <Typography variant="body2" color="white">
                Location: {eventDetail.location}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      )}
    </>
  );
};

export default MediaCard;
