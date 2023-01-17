import { Alert, Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { snackbarState } from "src/atom/snackBarState";

const SnackbarAlert = () => {
	const [snackbar, setSnackbar] = useRecoilState(snackbarState);

	return (
		<Snackbar
			open={snackbar.isOpen}
			autoHideDuration={1000}
			onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
			style={{ width: "95%" }}
		>
			<Alert
				onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
				severity="success"
				style={{ width: "100%", fontSize: "1.4rem" }}
			>
				{snackbar.state === "add"
					? "성공적으로 북마크 되었습니다!"
					: "북마크가 해제되었습니다."}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarAlert;
