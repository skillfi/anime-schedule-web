import * as React from "react";
import {Tab, Tabs} from "@mui/material";

interface TabsProps{
    handleChange: () => void;
}

// export default function TabsComponent(props: TabsProps){
//     return (
//         <Tabs
//             orientation="vertical"
//             variant="scrollable"
//             value={value}
//             onChange={handleChange}
//             aria-label="Panel"
//             sx={{
//                 borderRight: 1, borderColor: 'divider', color: color,
//                 // background: `radial-gradient(${lblue}, ${colors.indigo[900]})`,
//                 borderRadius: 10
//             }}
//             textColor="primary"
//             indicatorColor="secondary"
//         >
//             {props.other.map((other, index) =>
//                 <Tab icon={other.icon} iconPosition={"start"} label={other.label} {...a11yProps(index)}
//                      sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={index}/>
//             )}
//             {props.adminOther?.map((other) =>
//                 <Tab icon={other.icon} iconPosition={"start"} label={other.label} {...a11yProps(3)}
//                      sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={3}/>
//             )}
//         </Tabs>
//     )
// }