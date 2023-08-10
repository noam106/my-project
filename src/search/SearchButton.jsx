// import * as React from 'react';
// import LoadingButton from '@mui/lab/LoadingButton';
// import Box from '@mui/material/Box';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';

// export default function SearchButton() {
//   const [loading, setLoading] = React.useState(true);
//   function handleClick() {
//     setLoading(true);
//   }

//   return (
//     <Box>
//       <FormControlLabel
//         sx={{
//           display: 'block',
//         }}
//         control={
//           <Switch
//             checked={loading}
//             onChange={() => setLoading(!loading)}
//             name="loading"
//             color="primary"
//           />
//         }
//         label="Loading"
//       />
//       <Box sx={{ '& > button': { m: 1 } }}>
//         <LoadingButton
//           size="small"
//           onClick={handleClick}
//           loading={loading}
//           variant="outlined"
//           disabled
//         >
//           <span>disabled</span>
//         </LoadingButton>
//         <LoadingButton
//           onClick={handleClick}
//           loading={loading}
//           loadingIndicator="Loading…"
//           variant="outlined"
//         >
//           <span>Fetch data</span>
//         </LoadingButton>
//       </Box>
//     </Box>
//   );
// }