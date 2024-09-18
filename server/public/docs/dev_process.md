# Dev Process

## The Project

The project will be a workspace where for each features we will create a library. The libraries will be standalone and can be used in other projects. The libraries can be published in npm or can be private. 

## Development Step Process

for starting we create the workspace and the first focus will be the authentication library.

We have to create in first place two libraries for starting with other libraries. the core libraries wich contains all the shared code between the libraries and the fetchApi library wich contains the code for fetching the data from the Communigate server with ximss.

Then when the authentication process will be done, we can start to create the other libraries for the other features.

We create a main libraries wich create the tabs for the application and the main layout of the application. The tabs will be populated by the features libraries. 

the first one will be the preferences library wich will be populated from all the feature libraries (mail, contact ...) that will be used by the application to display the preferences of the user.

The second one will be the mail library wich will be used to display the mail, mailbox of the user. and let the user make all actions that can be done with the mail. 

The third one will be the contact library wich will be used to display the contacts of the user. and let the user make all actions that can be done with the contacts. like send mail to a contact, add a contact to a group, chat with a contact, make a reunion with a contact ...all of that actions will be populated directly by the features libraries.

The fourth one will be the chat library wich will be used to display the chat of the user. and let the user make all actions that can be done with the chat. like send a message, make a group chat, make a video call, make a voice call.

The fifth one will be the reunion library wich will be used let the user have a video calls with its contacts. and let the user make all actions that can be done with the reunion. like make a reunion, join a reunion, leave a reunion, make a video call, make a voice call.

## Authentication Library

We will have two libraries for authentication. 
- The first one will be the authentication background mechanism wich can be used by all other libraries when they are used in a standalone mode. 
- The second one will be the authentication ui library. The authentication ui library will be used by the application that will use the authentication mechanism.

## TDD (Test Driven Development)

For each library we will use the TDD process. We will start by writing the tests and then we will develop the code. This will help us to have a better code and to have a better understanding and maintability of the code.


## The Rules of Dev Process i want to follow are:
- using an angular workspace and create a library for each standalone feature. to be the most mudalar as possible
- tdd (test driven development) before developping each standalone feature
- developping focusing angular version 18.0.0 (released in june 2024) to be ready for the next version
- using the new signals api in version 17 to be ready for the next version
- using the new angular cli to be ready for the next version
- using ngrx to manage the state of the application
- For translation using ngx-translate as it is the most popular library for translation in angular and integrate it at the beginning of the project
- Using Eslint [airbnb](https://github.com/airbnb/javascript) or [google](https://github.com/google/eslint-config-google) config to use the best practices in the project
- Using new Guards function without to have to use it in a Class to be ready for the next version
- Using a Lazy loading for each feature to have a better performance

Here is a Mermaid diagram of the project structure:
[![](https://mermaid.ink/img/pako:eNqtVltP4zgU_itn87QrFYY2TRn6sFJoC2QGWlSoptp2pHET01gkdmS7FBbx39eXJLih3dld7ZvPOd-5f3by6sUswV7fW3NUpHA_XFIAsVlZ8Rvjj6JAMdZagHBxO52M7yc-hHS9yRCHLV4JIvF3a6_9BpPpyKoAzhdaKhGYJg3o9eQyGp-Hg6-X08lsPKy8BouG4e8DXKgUuwGGi4bhYICL0f3gqnIbLYx4EHwTRtcV9mKhpYPQwVV4X0EvF1o6CJ2OZuNoMq7QV4tScTi2WkM4qMNHi1Jx0OE2nIY3dxX-y8LKTXgIR0e_O9uzsutbIZz0VrXTglXtXa1jai7Nmpx1lMnqOVq5WoGpeoeuQyTRComSrUPFPJbnG0rWSGK4w_wJ8-_7PefRzV3Z4dxhwEfgLLKoWdQ-QLBZ1HF5MYt8d_ezqNtY7iwKdrZX57TdzvVxbo7Dc31WmY2k8lixU4q-Ff1S7Fox2LUG-62dXbHtJnKzfHFzlELXFYJK0GK1D6VzedVQv9PrA75mWcPikK1h2cO5fYhd6jUQNQOb9ZREbKgtH7VBN1jfoNH89jqMxr8uvR-RAARCIpqgjFEM6gAU4wQnsCUyBZRlwGSKuQvCzwXj0mC_kTgFIiDBgqyp8pIMUvSEjaPyA5EirtQPGMkNx8I4CcV3EuMfS-83XZudsnOfnfqmeM3ZpqjDFYijXMAD40aEjKxgmzJTMxAJv0AkBRSsUN8AdbNMDxqY4qwA9gAx47ZJHVA7x4gCyYsM55gqT4UlHNiWlpmqGhvL2_eI_I9T3ZqpUslZsokxhGXzKxQ_6nEoRMbWhEKO4xRRInJjpkzCExFklZk5SdHSE2ksZ1UlqmuhL_UU9TBcgK5lI_RBV7gzi3ea7ns1nVncq8pstbPo02yuKsTbKpKh8_vT-p8mWM8rR4_YzMG8mIAKovrRk2NG6z64wjy4VRX6ltTP909q2JZ81xHVH0aOSAbiRUic6zwZlnpeHDhGyactV_8fgA2mpcqjaI1BSyv2XOXWF7f-lPwkd50cgaK3uuRq-bLMXsUrnx_3u_cPO0KKTVgSulYbSjCzs9uqCduhmrbMZaEScxQrYlHHxy7FcRXHdYv2rXS_zv9iyDYvo1Kn1NxpwQNnOXwsrBxwqhwrvL3oglluIDOwltsf44b_5euk4qmB6lh6kSnJ35st-ysD29aW1Gt5OeZqpYn6TX3VzS49VVOOl15fHRPEH5fekr4pHNpIdvdCY68v-Qa3vE2RKCYOCVIf73xXOUqIZNzrP6jSlbJA1Ou_es9e_6h9FhyfnPROu512txf47bNey3vx-p2Of9z-3AlOOkHQ8U_9XvDW8v5kTMVtH_vd089-0PNPTs_a7e5Zy8Mm_I39tza_2CbHHwav63j7C2_hg6I?type=png)](https://mermaid.live/edit#pako:eNqtVltP4zgU_itn87QrFYY2TRn6sFJoC2QGWlSoptp2pHET01gkdmS7FBbx39eXJLih3dld7ZvPOd-5f3by6sUswV7fW3NUpHA_XFIAsVlZ8Rvjj6JAMdZagHBxO52M7yc-hHS9yRCHLV4JIvF3a6_9BpPpyKoAzhdaKhGYJg3o9eQyGp-Hg6-X08lsPKy8BouG4e8DXKgUuwGGi4bhYICL0f3gqnIbLYx4EHwTRtcV9mKhpYPQwVV4X0EvF1o6CJ2OZuNoMq7QV4tScTi2WkM4qMNHi1Jx0OE2nIY3dxX-y8LKTXgIR0e_O9uzsutbIZz0VrXTglXtXa1jai7Nmpx1lMnqOVq5WoGpeoeuQyTRComSrUPFPJbnG0rWSGK4w_wJ8-_7PefRzV3Z4dxhwEfgLLKoWdQ-QLBZ1HF5MYt8d_ezqNtY7iwKdrZX57TdzvVxbo7Dc31WmY2k8lixU4q-Ff1S7Fox2LUG-62dXbHtJnKzfHFzlELXFYJK0GK1D6VzedVQv9PrA75mWcPikK1h2cO5fYhd6jUQNQOb9ZREbKgtH7VBN1jfoNH89jqMxr8uvR-RAARCIpqgjFEM6gAU4wQnsCUyBZRlwGSKuQvCzwXj0mC_kTgFIiDBgqyp8pIMUvSEjaPyA5EirtQPGMkNx8I4CcV3EuMfS-83XZudsnOfnfqmeM3ZpqjDFYijXMAD40aEjKxgmzJTMxAJv0AkBRSsUN8AdbNMDxqY4qwA9gAx47ZJHVA7x4gCyYsM55gqT4UlHNiWlpmqGhvL2_eI_I9T3ZqpUslZsokxhGXzKxQ_6nEoRMbWhEKO4xRRInJjpkzCExFklZk5SdHSE2ksZ1UlqmuhL_UU9TBcgK5lI_RBV7gzi3ea7ns1nVncq8pstbPo02yuKsTbKpKh8_vT-p8mWM8rR4_YzMG8mIAKovrRk2NG6z64wjy4VRX6ltTP909q2JZ81xHVH0aOSAbiRUic6zwZlnpeHDhGyactV_8fgA2mpcqjaI1BSyv2XOXWF7f-lPwkd50cgaK3uuRq-bLMXsUrnx_3u_cPO0KKTVgSulYbSjCzs9uqCduhmrbMZaEScxQrYlHHxy7FcRXHdYv2rXS_zv9iyDYvo1Kn1NxpwQNnOXwsrBxwqhwrvL3oglluIDOwltsf44b_5euk4qmB6lh6kSnJ35st-ysD29aW1Gt5OeZqpYn6TX3VzS49VVOOl15fHRPEH5fekr4pHNpIdvdCY68v-Qa3vE2RKCYOCVIf73xXOUqIZNzrP6jSlbJA1Ou_es9e_6h9FhyfnPROu512txf47bNey3vx-p2Of9z-3AlOOkHQ8U_9XvDW8v5kTMVtH_vd089-0PNPTs_a7e5Zy8Mm_I39tza_2CbHHwav63j7C2_hg6I)

