type Props = {
  title: string;
  amount: number | string;
};

const OverviewBox = ({ title, amount }: Props) => {
  return (
    <div className="rounded-md flex-1 border-2 p-3">
      <p>{title}</p>
      <span className="text-xl">{amount}</span>
    </div>
  );
};

export default OverviewBox;
