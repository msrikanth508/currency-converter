import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Slider from "../Slider";
import InputField from "../InputField";
import { currencyFormatter } from "../../utils/formatter";
import { PocketsShape, ExchangeShape } from "../../types";

type Props = {
  isActive: boolean;
  pockets: PocketsShape;
  exchange: ExchangeShape;
  onInputChange: (val: string) => void;
  initialSlide: number;
  afterChange: (n: number) => void;
  activePocketIndex: number;
  passivePocketIndex: number;
};

export default function CurrencyExchangeCard({
  isActive,
  pockets,
  onInputChange,
  exchange,
  activePocketIndex,
  passivePocketIndex,
  ...sliderProps
}: Props) {
  const type = isActive ? "active" : "passive";
  return (
    <Box
      p={2}
      bgcolor={isActive ? "primary.light" : "primary.main"}
      color="primary.contrastText"
      pb={4}
    >
      <Box my={2}>
        <Slider {...sliderProps}>
          {pockets.map((pocket, index) => (
            <div
              key={
                isActive ? `active-${pocket.name}` : `passive-${pocket.name}`
              }
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                minHeight={"100px"}
                mb={3}
              >
                <Box flexBasis={"50%"}>
                  <Typography variant="h5">{pocket.name}</Typography>
                  <Typography variant="body1">
                    You have {currencyFormatter(pocket.value, pocket.id)}
                  </Typography>
                </Box>
                <Box flexBasis={"50%"}>
                  <InputField
                    type={type}
                    onChange={onInputChange}
                    exchange={exchange}
                  />
                </Box>
              </Box>
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
