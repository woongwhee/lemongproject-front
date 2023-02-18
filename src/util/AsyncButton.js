import {useAsyncCallback} from "react-async-hook";

export const AsyncButton = ({ onClick, children }) => {
    const asyncOnClick = useAsyncCallback(onClick);
    return (
        <span onClick={asyncOnClick.execute} disabled={asyncOnClick.loading}>
            {asyncOnClick.loading ? '...' : children}
        </span>
    );
};
