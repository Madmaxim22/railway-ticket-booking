import { useEffect, useRef } from 'react';
import './SeatLayoutCoupeSvg.css';

type SeatLayoutSvgProps = {
  wagonNumber?: string;
  selectedSeats?: number[];
  unavailableSeats?: number[];
  onSeatClick?: (event: React.MouseEvent<SVGGElement>, seatNumber: number) => void;
};

export default function SeatLayoutCoupeSvg({
  wagonNumber = '07',
  selectedSeats = [],
  unavailableSeats = [],
  onSeatClick,
}: SeatLayoutSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const handleSeatGroupClick = (event: React.MouseEvent<SVGGElement>) => {
    const seatNumber = Number(event.currentTarget.dataset.seatNumber);
    if (!seatNumber) {
      return;
    }

    onSeatClick?.(event, seatNumber);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }

    const selectedSet = new Set(selectedSeats);
    const unavailableSet = new Set(unavailableSeats);

    const seatGroups = svg.querySelectorAll<SVGGElement>('g[data-seat-number]');
    seatGroups.forEach((group) => {
      const seatNumber = Number(group.dataset.seatNumber);
      const isSelected = selectedSet.has(seatNumber);
      const isUnavailable = unavailableSet.has(seatNumber);

      group.classList.toggle('seat-layout-coupe__seat-group--selected', isSelected && !isUnavailable);
      group.classList.toggle('seat-layout-coupe__seat-group--occupied', isUnavailable);
    });
  }, [selectedSeats, unavailableSeats]);

  return (
    <svg
      className="seat-layout-coupe__svg"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="221.808 115.966 922.959 155.285"
    >
    <rect className="seat-layout-coupe__frame" x="223.064" y="141.229" width="919.479" height="117.162" rx="11.458" ry="11.458" transform="matrix(1, 0, -0.010369, 1, 2.070194, 0.73076)"></rect>
    <rect className="seat-layout-coupe__detail-rect" x="238.857" y="255.29" width="14.199" height="6.227"></rect>
    <rect className="seat-layout-coupe__wagon-label-bg" x="261.527" y="117.78" width="33.225" height="24.048"></rect>
    <text className="wagon-number-text seat-layout-coupe__wagon-number" x="271.653" y="134.709">{wagonNumber}</text>
    <line className="seat-layout-coupe__stroke" x1="354.052" y1="237.537" x2="1069.816" y2="236.874"></line>
    <line className="seat-layout-coupe__stroke" x1="1104.941" y1="258.745" x2="1104.279" y2="142.433"></line>
    <polyline className="seat-layout-coupe__stroke" points="1071.46 205.228 1087.174 192.99 1086.947 177.125 1104.096 177.05"></polyline>
    <polyline className="seat-layout-coupe__stroke-2" points="1103.84 198.02 1103.84 177.253"></polyline>
    <path className="seat-layout-coupe__stroke-2" d="M 261.811 178.539 C 261.851 178.579 261.639 210.853 261.308 210.522"></path>
    <polyline className="seat-layout-coupe__stroke" points="262.152 258.543 261.654 210.197 294.335 230.774 294.549 258.685"></polyline>
    <polyline className="seat-layout-coupe__stroke" points="352.034 205.866 309.155 206.111 261.73 178.344 261.485 142.1 295.518 142.223 295.395 198.125"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="353.921 230.829 353.782 258.05"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="443.709 231.246 443.57 258.467"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="532.733 231.108 532.594 258.329"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="623.007 231.108 622.868 258.329"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="711.613 231.246 711.474 258.467"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="801.47 230.969 801.331 258.19"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="890.771 231.107 890.632 258.328"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="980.767 231.107 980.628 258.328"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="1069.65 230.969 1069.51 258.19"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="351.652 256.853 1071.66 256.853"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="1042.66 207.191 1069.71 206.994 1069.32 144.594 353.306 145.582 353.503 207.389 381.149 207.389"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="416.403 206.314 471.445 206.314"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="443.326 146.087 443.525 206.115"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="505.946 206.713 560.988 206.713"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="532.869 146.486 533.068 206.514"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="596.287 206.315 651.328 206.315"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="623.209 146.088 623.409 206.116"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="684.433 205.915 739.475 205.915"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="711.356 145.688 711.555 205.716"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="774.774 206.713 829.816 206.713"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="801.697 146.486 801.896 206.514"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="863.32 206.314 918.362 206.314"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="890.243 146.087 890.442 206.115"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="953.461 206.115 1008.5 206.115"></polyline>
    <polyline className="seat-layout-coupe__stroke-4" points="980.384 145.888 980.583 205.916"></polyline>
    <rect className="seat-layout-coupe__accessory" x="-1092.4" y="148.767" width="1.396" height="19.053" transform="matrix(-1, 0, 0, 1, 2185.067383, 0)"></rect>
    <path className="seat-layout-coupe__accessory" d="M 1097.73 158.131 L 1097.73 153.486 C 1097.73 153.306 1097.66 153.155 1097.54 153.046 C 1097.42 152.93 1097.26 152.875 1097.07 152.875 C 1096.89 152.875 1096.71 152.93 1096.59 153.046 C 1096.46 153.155 1096.39 153.306 1096.39 153.486 L 1096.39 158.131 L 1094.54 158.131 L 1096.47 164.246 L 1096.14 164.246 C 1095.93 163.559 1095.75 163.008 1095.61 162.572 C 1095.48 162.135 1095.34 161.724 1095.22 161.325 C 1095.08 160.933 1094.99 160.683 1094.98 160.598 C 1094.9 160.339 1094.72 160.213 1094.43 160.213 L 1094.28 160.247 C 1094.01 160.339 1093.89 160.502 1093.89 160.733 C 1093.89 160.797 1093.9 160.849 1093.92 160.901 C 1093.94 160.946 1094 161.1 1094.06 161.36 C 1094.14 161.619 1094.24 161.94 1094.35 162.314 C 1094.48 162.693 1094.6 163.105 1094.74 163.546 C 1094.88 163.988 1095.01 164.415 1095.17 164.827 C 1095.26 165.142 1095.46 165.428 1095.77 165.676 C 1096.09 165.934 1096.41 166.05 1096.74 166.05 L 1099.01 166.05 C 1099.36 166.05 1099.7 165.934 1099.99 165.676 C 1100.29 165.428 1100.5 165.142 1100.62 164.827 C 1100.75 164.415 1100.88 163.988 1101.01 163.546 C 1101.14 163.105 1101.27 162.693 1101.39 162.314 C 1101.5 161.94 1101.61 161.619 1101.68 161.36 C 1101.75 161.1 1101.8 160.946 1101.83 160.901 L 1101.86 160.763 C 1101.86 160.484 1101.73 160.32 1101.46 160.247 L 1101.32 160.213 C 1101.02 160.213 1100.84 160.339 1100.77 160.598 C 1100.75 160.683 1100.66 160.933 1100.55 161.325 C 1100.43 161.724 1100.29 162.135 1100.15 162.572 C 1100 163.008 1099.84 163.559 1099.63 164.246 L 1099.29 164.246 L 1101.21 158.131 L 1099.4 158.131 L 1099.4 153.486 C 1099.4 153.306 1099.34 153.155 1099.19 153.046 C 1099.06 152.93 1098.91 152.875 1098.71 152.875 C 1098.51 152.875 1098.36 152.93 1098.24 153.046 C 1098.11 153.155 1098.06 153.306 1098.06 153.486 L 1098.06 158.131 L 1097.73 158.131 Z" stroke="none" transform="matrix(-1, 0, 0, -1, 0.000002, 0.000015)"></path>
    <path className="seat-layout-coupe__accessory" d="M 1097.91 149.833 C 1098.3 149.833 1098.63 149.952 1098.89 150.202 C 1099.16 150.458 1099.29 150.775 1099.29 151.158 C 1099.29 151.523 1099.16 151.835 1098.89 152.093 C 1098.63 152.359 1098.3 152.492 1097.91 152.492 C 1097.5 152.492 1097.16 152.359 1096.88 152.093 C 1096.6 151.835 1096.47 151.523 1096.47 151.158 C 1096.47 150.775 1096.6 150.458 1096.88 150.202 C 1097.16 149.952 1097.5 149.833 1097.91 149.833 Z" transform="matrix(-1, 0, 0, -1, -0.000007, -0.000014)"></path>
    <path className="seat-layout-coupe__accessory" d="M 1084.55 166.05 C 1084.07 166.05 1083.64 165.878 1083.28 165.545 C 1082.92 165.198 1082.74 164.792 1082.74 164.341 L 1082.74 160.174 C 1082.74 160.018 1082.8 159.875 1082.92 159.762 C 1083.04 159.649 1083.19 159.598 1083.36 159.598 C 1083.55 159.598 1083.7 159.649 1083.82 159.762 C 1083.92 159.875 1083.98 160.018 1083.98 160.174 L 1083.98 163.9 L 1084.29 163.9 L 1084.29 153.581 C 1084.29 153.382 1084.39 153.2 1084.55 153.057 C 1084.72 152.901 1084.91 152.836 1085.13 152.836 C 1085.37 152.836 1085.57 152.901 1085.72 153.057 C 1085.89 153.2 1085.97 153.382 1085.97 153.581 L 1085.97 159.564 L 1086.32 159.564 L 1086.32 153.581 C 1086.32 153.382 1086.41 153.2 1086.56 153.057 C 1086.72 152.901 1086.92 152.836 1087.17 152.836 C 1087.38 152.836 1087.57 152.901 1087.73 153.057 C 1087.88 153.2 1087.95 153.382 1087.95 153.581 L 1087.95 163.9 L 1088.29 163.9 L 1088.29 160.174 C 1088.29 160.018 1088.34 159.875 1088.45 159.762 C 1088.58 159.649 1088.74 159.598 1088.9 159.598 C 1089.1 159.598 1089.24 159.649 1089.36 159.762 C 1089.46 159.875 1089.52 160.018 1089.52 160.174 L 1089.52 164.341 C 1089.52 164.792 1089.35 165.197 1088.99 165.545 C 1088.63 165.878 1088.21 166.05 1087.7 166.05 L 1084.55 166.05 Z" transform="matrix(-1, 0, 0, -1, -0.000001, 0.000016)"></path>
    <path className="seat-layout-coupe__accessory" d="M 1086.11 149.833 C 1086.5 149.833 1086.84 149.952 1087.12 150.202 C 1087.39 150.458 1087.52 150.775 1087.52 151.158 C 1087.52 151.523 1087.39 151.835 1087.12 152.093 C 1086.84 152.359 1086.5 152.492 1086.11 152.492 C 1085.71 152.492 1085.37 152.359 1085.11 152.093 C 1084.83 151.835 1084.7 151.523 1084.7 151.158 C 1084.7 150.775 1084.83 150.458 1085.11 150.202 C 1085.37 149.952 1085.71 149.833 1086.11 149.833 Z" transform="matrix(-1, 0, 0, -1, 0.000003, -0.000014)"></path>
    <g id="Layer_1" transform="matrix(0.310482, 0, 0, 0.310107, 729.045166, 177.072357)">
      <g transform="matrix(1, 0, 0, 1, 1131.203247, 196.511795)">
        <g id="Icon-Trash" transform="translate(232.000000, 228.000000)">
          <polygon className="seat-layout-coupe__accessory" id="Fill-6" points="-207.5,-205.1 -204.5,-205.1 -204.5,-181.1 -207.5,-181.1"></polygon>
          <polygon className="seat-layout-coupe__accessory" id="Fill-7" points="-201.5,-205.1 -198.5,-205.1 -198.5,-181.1 -201.5,-181.1"></polygon>
          <polygon className="seat-layout-coupe__accessory" id="Fill-8" points="-195.5,-205.1 -192.5,-205.1 -192.5,-181.1 -195.5,-181.1"></polygon>
          <polygon className="seat-layout-coupe__accessory" id="Fill-9" points="-219.5,-214.1 -180.5,-214.1 -180.5,-211.1 -219.5,-211.1"></polygon>
          <path className="seat-layout-coupe__accessory" d="M-192.6-212.6h-2.8v-3c0-0.9-0.7-1.6-1.6-1.6h-6c-0.9,0-1.6,0.7-1.6,1.6v3h-2.8v-3     c0-2.4,2-4.4,4.4-4.4h6c2.4,0,4.4,2,4.4,4.4V-212.6" id="Fill-10"></path>
          <path className="seat-layout-coupe__accessory" d="M-191-172.1h-18c-2.4,0-4.5-2-4.7-4.4l-2.8-36l3-0.2l2.8,36c0.1,0.9,0.9,1.6,1.7,1.6h18     c0.9,0,1.7-0.8,1.7-1.6l2.8-36l3,0.2l-2.8,36C-186.5-174-188.6-172.1-191-172.1" id="Fill-11"></path>
        </g>
      </g>
    </g>

    <path className="seat-layout-coupe__accessory" d="M 283.805 165.598 L 283.805 160.953 C 283.805 160.773 283.735 160.622 283.615 160.513 C 283.495 160.397 283.335 160.342 283.145 160.342 C 282.965 160.342 282.785 160.397 282.665 160.513 C 282.535 160.622 282.465 160.773 282.465 160.953 L 282.465 165.598 L 280.615 165.598 L 282.545 171.713 L 282.215 171.713 C 282.005 171.026 281.825 170.475 281.685 170.039 C 281.555 169.602 281.415 169.191 281.295 168.792 C 281.155 168.4 281.065 168.15 281.055 168.065 C 280.975 167.806 280.795 167.68 280.505 167.68 L 280.355 167.714 C 280.085 167.806 279.965 167.969 279.965 168.2 C 279.965 168.264 279.975 168.316 279.995 168.368 C 280.015 168.413 280.075 168.567 280.135 168.827 C 280.215 169.086 280.315 169.407 280.425 169.781 C 280.555 170.16 280.675 170.572 280.815 171.013 C 280.955 171.455 281.085 171.882 281.245 172.294 C 281.335 172.609 281.535 172.895 281.845 173.143 C 282.165 173.401 282.485 173.517 282.815 173.517 L 285.085 173.517 C 285.435 173.517 285.775 173.401 286.065 173.143 C 286.365 172.895 286.575 172.609 286.695 172.294 C 286.825 171.882 286.955 171.455 287.085 171.013 C 287.215 170.572 287.345 170.16 287.465 169.781 C 287.575 169.407 287.685 169.086 287.755 168.827 C 287.825 168.567 287.875 168.413 287.905 168.368 L 287.935 168.23 C 287.935 167.951 287.805 167.787 287.535 167.714 L 287.395 167.68 C 287.095 167.68 286.915 167.806 286.845 168.065 C 286.825 168.15 286.735 168.4 286.625 168.792 C 286.505 169.191 286.365 169.602 286.225 170.039 C 286.075 170.475 285.915 171.026 285.705 171.713 L 285.365 171.713 L 287.285 165.598 L 285.475 165.598 L 285.475 160.953 C 285.475 160.773 285.415 160.622 285.265 160.513 C 285.135 160.397 284.985 160.342 284.785 160.342 C 284.585 160.342 284.435 160.397 284.315 160.513 C 284.185 160.622 284.135 160.773 284.135 160.953 L 284.135 165.598 L 283.805 165.598 Z" stroke="none" transform="matrix(-1, 0, 0, -1, -0.000003, 0.000003)"></path>
    <path className="seat-layout-coupe__accessory" d="M 283.985 157.3 C 284.375 157.3 284.705 157.419 284.965 157.669 C 285.235 157.925 285.365 158.242 285.365 158.625 C 285.365 158.99 285.235 159.302 284.965 159.56 C 284.705 159.826 284.375 159.959 283.985 159.959 C 283.575 159.959 283.235 159.826 282.955 159.56 C 282.675 159.302 282.545 158.99 282.545 158.625 C 282.545 158.242 282.675 157.925 282.955 157.669 C 283.235 157.419 283.575 157.3 283.985 157.3 Z" transform="matrix(-1, 0, 0, -1, 0.000041, -0.000009)"></path>
    <path className="seat-layout-coupe__accessory" d="M 270.625 173.517 C 270.145 173.517 269.715 173.345 269.355 173.012 C 268.995 172.665 268.815 172.259 268.815 171.808 L 268.815 167.641 C 268.815 167.485 268.875 167.342 268.995 167.229 C 269.115 167.116 269.265 167.065 269.435 167.065 C 269.625 167.065 269.775 167.116 269.895 167.229 C 269.995 167.342 270.055 167.485 270.055 167.641 L 270.055 171.367 L 270.365 171.367 L 270.365 161.048 C 270.365 160.849 270.465 160.667 270.625 160.524 C 270.795 160.368 270.985 160.303 271.205 160.303 C 271.445 160.303 271.645 160.368 271.795 160.524 C 271.965 160.667 272.045 160.849 272.045 161.048 L 272.045 167.031 L 272.395 167.031 L 272.395 161.048 C 272.395 160.849 272.485 160.667 272.635 160.524 C 272.795 160.368 272.995 160.303 273.245 160.303 C 273.455 160.303 273.645 160.368 273.805 160.524 C 273.955 160.667 274.025 160.849 274.025 161.048 L 274.025 171.367 L 274.365 171.367 L 274.365 167.641 C 274.365 167.485 274.415 167.342 274.525 167.229 C 274.655 167.116 274.815 167.065 274.975 167.065 C 275.175 167.065 275.315 167.116 275.435 167.229 C 275.535 167.342 275.595 167.485 275.595 167.641 L 275.595 171.808 C 275.595 172.259 275.425 172.664 275.065 173.012 C 274.705 173.345 274.285 173.517 273.775 173.517 L 270.625 173.517 Z" transform="matrix(-1, 0, 0, -1, 0.000034, -0.000012)"></path>
    <path className="seat-layout-coupe__accessory" d="M 272.185 157.3 C 272.575 157.3 272.915 157.419 273.195 157.669 C 273.465 157.925 273.595 158.242 273.595 158.625 C 273.595 158.99 273.465 159.302 273.195 159.56 C 272.915 159.826 272.575 159.959 272.185 159.959 C 271.785 159.959 271.445 159.826 271.185 159.56 C 270.905 159.302 270.775 158.99 270.775 158.625 C 270.775 158.242 270.905 157.925 271.185 157.669 C 271.445 157.419 271.785 157.3 272.185 157.3 Z" transform="matrix(-1, 0, 0, -1, 0.000008, -0.000009)"></path>
    <rect className="seat-layout-coupe__detail-rect" x="238.712" y="139.679" width="14.199" height="6.227"></rect>
    <g id="_x32_5_x2C__No_Smoking_x2C__smoking_x2C__cugrette_x2C__smoke_x2C__prohibition" transform="matrix(0.032126, 0, 0, 0.0308, 1115.752808, 193.542297)">
      <g>
        <path className="seat-layout-coupe__no-smoking" d="M256,0C114.496,0,0,114.517,0,256c0,141.504,114.517,256,256,256c141.504,0,256-114.517,256-256    C512,114.496,397.483,0,256,0z M492,256c0,61.476-23.636,117.528-62.287,159.571L315.286,301.143c9.559,0,115.047,0,136.51,0    c5.522,0,10-4.477,10-10v-70.286c0-5.523-4.478-10-10-10c-5.971,0-220.524,0-226.796,0L96.429,82.287    C138.472,43.636,194.524,20,256,20C386.131,20,492,125.869,492,256z M411.592,230.857h30.204v50.286h-30.204V230.857z M20,256    c0-61.476,23.636-117.528,62.287-159.571l114.428,114.428c-13.88,0-106.852,0-136.51,0c-5.522,0-10,4.477-10,10v70.286    c0,5.523,4.478,10,10,10c9.057,0,215.76,0,226.796,0l128.57,128.57C373.528,468.364,317.476,492,256,492    C125.869,492,20,386.131,20,256z M70.204,281.143v-50.286h80.408v50.286H70.204z"></path>
        <path className="seat-layout-coupe__no-smoking" d="M366.376,176.259l19.889-2.775c5.507-0.77,10.606,3.063,11.378,8.591c0.76,5.445,5.784,9.285,11.286,8.523    c5.47-0.763,9.285-5.816,8.522-11.286c-2.298-16.469-17.497-27.941-33.95-25.636l-19.889,2.775    c-5.538,0.773-10.611-3.092-11.378-8.592c-0.772-5.519,3.074-10.609,8.591-11.377c16.428-2.292,27.928-17.522,25.637-33.951    l-1.388-9.945c-0.765-5.469-5.81-9.287-11.286-8.521c-5.47,0.763-9.285,5.816-8.522,11.286l1.388,9.944    c0.769,5.506-3.086,10.611-8.592,11.379c-16.468,2.298-27.933,17.484-25.636,33.95    C334.724,167.097,349.92,178.561,366.376,176.259z"></path>
      </g>
    </g>
    
    <g className="seat-layout-coupe__seat-group" data-seat-number="1" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="355.859" y="177.103" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="364.567" y="195.48">1</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="2" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="355.879" y="148.082" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="365.035" y="166.7">2</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="3" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="415.723" y="176.786" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="424.431" y="195.163">3</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="4" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="415.743" y="147.765" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="424.899" y="166.383">4</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="5" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="445.817" y="176.785" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="454.525" y="195.162">5</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="6" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="445.837" y="147.764" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="454.993" y="166.382">6</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="7" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="505.039" y="176.785" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="513.747" y="195.162">7</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="8" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="505.059" y="147.764" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="514.215" y="166.382">8</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="9" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="535.231" y="176.689" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="543.939" y="195.066">9</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="10" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="535.251" y="147.668" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="540.407" y="166.286">10</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="11" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="595.13" y="176.593" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="601.838" y="194.97">11</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="12" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="595.15" y="147.572" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="601.306" y="166.19">12</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="13" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="625.709" y="176.398" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="631.417" y="194.775">13</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="14" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="625.729" y="147.377" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="630.885" y="165.995">14</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="15" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="683.867" y="176.398" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="689.575" y="194.775">15</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="16" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="683.887" y="147.377" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="690.043" y="165.995">16</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="17" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="714.059" y="176.592" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="719.767" y="194.969">17</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="18" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="714.079" y="147.571" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="719.235" y="166.189">18</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="19" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="774.249" y="176.302" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="780.957" y="194.679">19</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="20" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="774.269" y="147.281" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="781.425" y="165.899">20</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="21" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="804.15" y="176.302" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="810.858" y="194.679">21</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="22" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="804.169" y="147.281" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="810.326" y="165.899">22</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="23" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="863.372" y="176.301" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="870.08" y="194.678">23</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="24" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="863.392" y="147.28" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="870.548" y="165.898">24</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="25" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="892.983" y="176.205" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="898.691" y="194.582">25</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="26" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="893.003" y="147.184" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="899.159" y="165.802">26</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="27" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="952.979" y="176.399" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="958.687" y="194.776">27</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="28" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="952.999" y="147.378" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="959.155" y="165.996">28</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="29" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="982.883" y="176.205" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="988.593" y="194.582">29</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="30" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="982.903" y="147.184" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="988.053" y="165.802">30</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="31" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="1041.81" y="176.399" width="25.278" height="27.834"></rect>
      <text className="seat-layout-coupe__seat-text" x="1048.52" y="194.776">31</text>
    </g>
    <g className="seat-layout-coupe__seat-group" data-seat-number="32" onClick={handleSeatGroupClick}>
      <rect className="seat-layout-coupe__seat-rect" x="1041.83" y="147.378" width="25.278" height="28.052"></rect>
      <text className="seat-layout-coupe__seat-text" x="1047.98" y="165.996">32</text>
    </g>
    
    
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-light" d="M -0.5,-0.5 C 25.5,-0.5 51.5,-0.5 77.5,-0.5C 59.3162,1.22123 40.9829,2.88789 22.5,4.5C 22.5,7.16667 22.5,9.83333 22.5,12.5C 38.8367,12.6666 55.1701,12.4999 71.5,12C 75.1312,8.21541 78.1312,4.04874 80.5,-0.5C 84.1667,-0.5 87.8333,-0.5 91.5,-0.5C 91.5,25.5 91.5,51.5 91.5,77.5C 89.7938,70.2673 86.1271,64.1007 80.5,59C 74.403,55.6178 68.0697,52.7845 61.5,50.5C 59.057,57.0585 56.8903,63.7252 55,70.5C 52.8318,76.8075 49.6651,82.4742 45.5,87.5C 37.5883,76.4504 32.5883,64.1171 30.5,50.5C 23.5187,52.4878 16.852,55.3212 10.5,59C 4.58447,64.3409 0.917801,70.8409 -0.5,78.5C -0.5,52.1667 -0.5,25.8333 -0.5,-0.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-dark" d="M 77.5,-0.5 C 78.5,-0.5 79.5,-0.5 80.5,-0.5C 78.1312,4.04874 75.1312,8.21541 71.5,12C 55.1701,12.4999 38.8367,12.6666 22.5,12.5C 22.5,9.83333 22.5,7.16667 22.5,4.5C 40.9829,2.88789 59.3162,1.22123 77.5,-0.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-dark-2" d="M 22.5,16.5 C 39.17,16.3334 55.8367,16.5001 72.5,17C 75.2554,18.7112 77.5887,20.8779 79.5,23.5C 60.5117,24.4996 41.5117,24.8329 22.5,24.5C 22.5,21.8333 22.5,19.1667 22.5,16.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-dark-3" d="M 22.5,28.5 C 37.8333,28.5 53.1667,28.5 68.5,28.5C 67.166,42.5007 59.4993,50.1674 45.5,51.5C 31.4756,50.1423 23.809,42.4756 22.5,28.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-dark" d="M 91.5,77.5 C 91.5,79.8333 91.5,82.1667 91.5,84.5C 80.4682,88.7794 69.1349,91.1128 57.5,91.5C 47.1667,91.5 36.8333,91.5 26.5,91.5C 17.2815,90.3186 8.28149,87.9852 -0.5,84.5C -0.5,82.5 -0.5,80.5 -0.5,78.5C 0.917801,70.8409 4.58447,64.3409 10.5,59C 16.852,55.3212 23.5187,52.4878 30.5,50.5C 32.5883,64.1171 37.5883,76.4504 45.5,87.5C 49.6651,82.4742 52.8318,76.8075 55,70.5C 56.8903,63.7252 59.057,57.0585 61.5,50.5C 68.0697,52.7845 74.403,55.6178 80.5,59C 86.1271,64.1007 89.7938,70.2673 91.5,77.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-dark-4" d="M 41.5,59.5 C 44.1667,59.5 46.8333,59.5 49.5,59.5C 50.6555,66.1584 48.1555,68.1584 42,65.5C 41.5045,63.5273 41.3379,61.5273 41.5,59.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-dark-2" d="M 42.5,68.5 C 44.5,68.5 46.5,68.5 48.5,68.5C 50.4942,73.8864 49.4942,78.5531 45.5,82.5C 41.5486,78.5358 40.5486,73.8691 42.5,68.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-light" d="M -0.5,84.5 C 8.28149,87.9852 17.2815,90.3186 26.5,91.5C 17.5,91.5 8.5,91.5 -0.5,91.5C -0.5,89.1667 -0.5,86.8333 -0.5,84.5 Z"></path>
    </g>
    <g transform="matrix(0.236856, 0, 0, 0.236807, 317.149811, 164.742752)">
      <path className="seat-layout-coupe__silhouette seat-layout-coupe__silhouette-light-2" d="M 91.5,84.5 C 91.5,86.8333 91.5,89.1667 91.5,91.5C 80.1667,91.5 68.8333,91.5 57.5,91.5C 69.1349,91.1128 80.4682,88.7794 91.5,84.5 Z"></path>
    </g>
    <path className="seat-layout-coupe__chassis" d="M 273.222 236.411 C 273.352 236.409 273.352 236.409 273.486 236.408 C 273.774 236.407 274.063 236.406 274.352 236.406 C 274.553 236.405 274.754 236.404 274.954 236.403 C 275.375 236.402 275.797 236.401 276.217 236.4 C 276.756 236.4 277.295 236.397 277.835 236.393 C 278.249 236.391 278.663 236.39 279.078 236.39 C 279.276 236.389 279.475 236.388 279.674 236.387 C 279.952 236.384 280.23 236.385 280.509 236.385 C 280.668 236.385 280.826 236.384 280.989 236.384 C 281.625 236.455 281.956 236.688 282.373 237.148 C 282.799 237.722 282.81 238.186 282.738 238.879 C 282.572 239.234 282.435 239.449 282.124 239.694 C 281.912 239.903 281.912 239.903 281.922 240.212 C 281.936 240.326 281.951 240.442 281.965 240.56 C 281.981 240.687 281.998 240.813 282.013 240.944 C 282.105 241.52 282.219 242.088 282.348 242.657 C 282.403 242.907 282.457 243.157 282.511 243.407 C 282.595 243.792 282.679 244.176 282.767 244.561 C 282.851 244.938 282.932 245.316 283.012 245.694 C 283.053 245.86 283.053 245.86 283.092 246.03 C 283.332 247.17 283.27 248.084 283.27 249.316 C 279.235 249.316 275.2 249.316 271.044 249.316 C 271.044 248.593 271.044 247.871 271.044 247.125 C 273.587 247.125 276.131 247.125 278.751 247.125 C 278.751 244.872 278.751 242.618 278.751 240.296 C 277.699 240.296 276.647 240.296 275.563 240.296 C 275.563 240.637 275.563 240.978 275.563 241.328 C 275.167 241.328 274.772 241.328 274.366 241.328 C 274.366 240.987 274.366 240.647 274.366 240.296 C 274.271 240.3 274.177 240.303 274.079 240.306 C 272.302 240.338 272.302 240.338 271.745 239.831 C 271.226 239.257 271.002 238.907 271.015 238.119 C 271.078 237.528 271.337 237.168 271.783 236.778 C 272.302 236.429 272.589 236.414 273.222 236.411 Z M 280.479 245.064 C 280.178 245.376 280.178 245.376 279.948 245.708 C 280.114 246.179 280.17 246.324 280.613 246.61 C 280.956 246.6 280.956 246.6 281.277 246.482 C 281.585 246.117 281.585 246.117 281.518 245.7 C 281.444 245.284 281.444 245.284 281.011 245.064 C 280.835 245.064 280.66 245.064 280.479 245.064 Z" transform="matrix(0.999983, 0.005856, -0.005856, 0.999983, 0, 0)"></path>
    <path className="seat-layout-coupe__chassis" d="M 272.106 242.23 C 273.993 242.23 275.878 242.23 277.822 242.23 C 277.668 244.464 277.668 244.464 277.373 245.282 C 277.345 245.367 277.318 245.453 277.289 245.54 C 277.13 246.004 276.977 246.388 276.625 246.74 C 276.082 246.848 275.526 246.817 274.972 246.811 C 274.819 246.814 274.668 246.818 274.512 246.821 C 274.097 246.82 273.711 246.811 273.303 246.74 C 272.978 246.413 272.978 246.413 272.771 246.095 C 272.419 246.037 272.419 246.037 272.049 246.086 C 271.353 246.12 271.353 246.12 270.894 245.853 C 270.474 245.391 270.467 245.051 270.475 244.453 C 270.532 244.013 270.701 243.805 271.044 243.518 C 271.408 243.413 271.408 243.413 271.708 243.389 C 271.799 243.752 271.799 243.752 271.841 244.162 C 271.711 244.294 271.578 244.422 271.442 244.549 C 271.475 244.976 271.475 244.976 271.708 245.321 C 272.041 245.344 272.041 245.344 272.373 245.321 C 272.416 245.28 272.461 245.237 272.506 245.193 C 272.433 244.771 272.346 244.355 272.255 243.937 C 272.237 243.848 272.218 243.758 272.2 243.666 C 272.181 243.585 272.163 243.505 272.146 243.421 C 272.094 243.028 272.106 242.627 272.106 242.23 Z" transform="matrix(0.999983, 0.005856, -0.005856, 0.999983, 0, 0)"></path>
  </svg>
  )
}
