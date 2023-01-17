import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useRecoilState } from "recoil";
import { alertState } from "src/atom/alertState";

const Alert = () => {
	const [isAlert, setIsAlert] = useRecoilState(alertState);

	return (
		<Dialog open={isAlert} onClose={() => setIsAlert(false)}>
			<DialogContent>
				<DialogTitle>레포지토리는 최대 4개까지 등록 가능해요.</DialogTitle>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsAlert(false)} autoFocus>
					확인
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Alert;
