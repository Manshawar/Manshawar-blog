import styles from "styled-components";
import React, { useState } from "react";
import { Slider, Switch } from "antd";
export default () => {
  const Container = styles.div` width: 100px;
    height: 100px;
    background-color: gray;
    transform: matrix3d(0.866,   0.5,  0,  0,
                         -0.5, 0.866,  0,  0,
                            0,     0,  1,  0,
                           20,     0,  0,  1);`;
  const [disabled, setDisabled] = useState(false);

  const onChange = (checked: boolean) => {
    setDisabled(checked);
  };
  return (
    <div>
      <Slider defaultValue={30} disabled={disabled} />
    </div>
  );
};
