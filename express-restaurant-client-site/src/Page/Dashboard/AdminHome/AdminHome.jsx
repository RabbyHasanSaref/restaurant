import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxios from "../../../Hooks/useAxios";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuthContext();
    const axiosSecuer = useAxios();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecuer.get('/admin-stats')
            return res.data
        }
    })
    // console.log(stats)
    const { revenue, users, orders, menuItems } = stats;

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecuer.get('/order-stats');
            return res.data;
        }
    })

    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })

    return (
        <div>
            <div className="mt-10 mb-5">
                <h2 className="text-2xl font-semibold uppercase"><span>Hi, Welcome </span>{user ? user?.displayName : 'Back!'}</h2>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                <div className="w-[250px h-[150px] border-2 pt-10 text-center shadow-lg">
                    <h2 className="text-[20px]">{revenue}</h2>
                    <p className="text-[20px] font-bold">Revenue</p>
                </div>

                <div className="w-[250px h-[150px] border-2 pt-10 text-center shadow-lg">
                    <h2 className="text-[20px]">{users}</h2>
                    <p className="text-[20px] font-bold">Customers</p>
                </div>

                <div className="w-[250px h-[150px] border-2 pt-10 text-center shadow-lg">
                    <h2 className="text-[20px]">{menuItems}</h2>
                    <p className="text-[20px] font-bold">Products</p>
                </div>

                <div className="w-[250px h-[150px] border-2 pt-10 text-center shadow-lg">
                    <h2 className="text-[20px]">{orders}</h2>
                    <p className="text-[20px] font-bold">Orders</p>
                </div>
            </div>

            <div className="flex items-center gap-5 mt-10 mb-5">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;