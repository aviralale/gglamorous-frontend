import Rating from "@mui/material/Rating";

interface BlackStarRatingProps {
  value: any;
  readOnly: boolean;
  size: any;
  name: string;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => void;
}

const BlackStarRating = ({
  value,
  readOnly = true,
  size = "small",
  name = "rating",
  onChange,
}: BlackStarRatingProps) => {
  return (
    <Rating
      name={name}
      value={value}
      readOnly={readOnly}
      size={size}
      onChange={onChange}
      sx={{
        "& .MuiRating-iconFilled": {
          color: "black",
        },
        "& .MuiRating-iconEmpty": {
          color: "#00000042",
        },
      }}
    />
  );
};

export default BlackStarRating;
