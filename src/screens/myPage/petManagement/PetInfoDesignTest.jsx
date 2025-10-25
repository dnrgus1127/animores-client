import React, { useState } from 'react';
import { ChevronLeft, Camera, Edit2, Calendar, Weight, Ruler, Heart, Syringe, FileText } from 'lucide-react';

export default function PetInfoPage() {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div className="w-full max-w-md mx-auto bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <button className="p-2">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-semibold">펫 정보</h1>
                <button className="p-2">
                    <Edit2 className="w-5 h-5" />
                </button>
            </div>

            {/* Pet Profile Section */}
            <div className="p-6 text-center">
                <div className="relative inline-block">
                    <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden mx-auto">
                        <img
                            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop"
                            alt="Pet"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button className="absolute bottom-0 right-0 w-9 h-9 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                        <Camera className="w-4 h-4 text-white" />
                    </button>
                </div>
                <h2 className="text-xl font-bold mt-4">골댕이</h2>
                <p className="text-gray-500 text-sm mt-1">골든 리트리버</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'info' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-400'}`}
                >
                    기본정보
                </button>
                <button
                    onClick={() => setActiveTab('health')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'health' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-400'}`}
                >
                    건강정보
                </button>
                <button
                    onClick={() => setActiveTab('memo')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'memo' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-400'}`}
                >
                    메모
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                {activeTab === 'info' && (
                    <div className="space-y-3">
                        <InfoCard icon={<Calendar className="w-5 h-5" />} label="생일" value="2021년 3월 15일" badge="3살" />
                        <InfoCard icon={<Weight className="w-5 h-5" />} label="몸무게" value="28.5 kg" />
                        <InfoCard icon={<Ruler className="w-5 h-5" />} label="체형" value="중형견" />
                        <InfoCard icon={<Heart className="w-5 h-5" />} label="성별" value="남아 (중성화 완료)" />

                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">특이사항</h3>
                            <div className="flex flex-wrap gap-2">
                                <Tag color="yellow">알러지</Tag>
                                <Tag color="purple">산책 좋아함</Tag>
                                <Tag color="blue">물 무서워함</Tag>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'health' && (
                    <div className="space-y-3">
                        <InfoCard
                            icon={<Syringe className="w-5 h-5" />}
                            label="최근 예방접종"
                            value="2023년 10월 5일"
                            badge="종합백신"
                        />
                        <InfoCard
                            icon={<Syringe className="w-5 h-5" />}
                            label="심장사상충"
                            value="2023년 11월 1일"
                        />
                        <InfoCard
                            icon={<FileText className="w-5 h-5" />}
                            label="최근 건강검진"
                            value="2023년 8월 12일"
                            badge="정상"
                        />

                        <div className="mt-6 p-4 bg-pink-50 rounded-xl">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-pink-400 rounded-full mt-1.5"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">다음 예방접종</p>
                                    <p className="text-xs text-gray-600 mt-1">2024년 4월 5일 (D-169)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'memo' && (
                    <div className="space-y-4">
                        <MemoCard
                            date="2023년 11월 3일"
                            content="오늘 산책 중에 다른 강아지와 잘 놀았음. 사회성이 좋아지고 있어서 기쁨 🐕"
                        />
                        <MemoCard
                            date="2023년 10월 28일"
                            content="사료를 로얄캐닌으로 변경. 소화가 잘 되는지 일주일 관찰 필요"
                        />
                        <MemoCard
                            date="2023년 10월 20일"
                            content="왼쪽 앞발을 조금 절뚝임. 병원 진료 결과 가벼운 염좌, 3일간 산책 자제"
                        />
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
                <div className="max-w-md mx-auto flex justify-around py-2">
                    <NavButton icon="🏠" label="홈" />
                    <NavButton icon="📅" label="일정" active />
                    <NavButton icon="🔔" label="알림" />
                    <NavButton icon="⚙️" label="설정" />
                </div>
            </div>

            {/* Floating Button */}
            <button className="fixed bottom-20 right-6 w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">+</span>
            </button>
        </div>
    );
}

function InfoCard({ icon, label, value, badge }) {
    return (
        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
            <div className="text-gray-600">
                {icon}
            </div>
            <div className="ml-3 flex-1">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
            </div>
            {badge && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
          {badge}
        </span>
            )}
        </div>
    );
}

function Tag({ color, children }) {
    const colors = {
        yellow: 'bg-yellow-100 text-yellow-700',
        purple: 'bg-purple-100 text-purple-700',
        blue: 'bg-blue-100 text-blue-700',
        pink: 'bg-pink-100 text-pink-700',
    };

    return (
        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
    );
}

function MemoCard({ date, content }) {
    return (
        <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-2">{date}</p>
            <p className="text-sm text-gray-800 leading-relaxed">{content}</p>
        </div>
    );
}

function NavButton({ icon, label, active }) {
    return (
        <button className="flex flex-col items-center gap-1 px-4">
            <span className="text-xl">{icon}</span>
            <span className={`text-xs ${active ? 'text-pink-500 font-medium' : 'text-gray-400'}`}>
        {label}
      </span>
        </button>
    );
}