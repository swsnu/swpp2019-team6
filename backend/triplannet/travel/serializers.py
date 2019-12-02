from rest_framework import serializers


from .models import *
from user.serializers import UserSerializer
class TravelBlockSerializer(serializers.ModelSerializer):

    class Meta:
        model = TravelBlock
        fields = '__all__'
    
    def create(self,validated_data):
         return TravelBlock.objects.create(**validated_data)

class TravelDaySerializer(serializers.ModelSerializer):
    
    blocks = TravelBlockSerializer(many=True)
    class Meta:
        model = TravelDay
        fields = '__all__'
        depth = 1
    
    def create(self,validated_data):
        blocks_data = validated_data.pop('blocks')
        travelDay = TravelDay.objects.create(**validated_data)

        for i,block_ in enumerate(blocks_data):
            block_obj=TravelBlockSerializer(block_).save()
            TravelBlockList(TravelDay=travelDay,
                            TravelBlock = block_obj,
                            index=i).save()

        return travelDay

class TravelCommitSerializer(serializers.ModelSerializer):

    days = TravelDaySerializer(many=True)
    author = UserSerializer(read_only=True)
    class Meta:
        model = TravelCommit
        # fields = '__all__'
        exclude = ['register_time','travel']
        # depth = 1

    def create(self, validated_data):
        days_data = validated_data.pop('days')
        travelCommit = TravelCommit.objects.create(**validated_data)
        for i,day_ in enumerate(days_data):
            day_obj =TravelDaySerializer(day_).save()
            TravelDayList(TravelCommit=travelCommit,
                            TravelDay=day_obj,
                            index=i).save()
        
        return travelCommit
    
class TravelSerializer(serializers.ModelSerializer):

    head = TravelCommitSerializer()
    author = UserSerializer(read_only=True)
    collaboraters = UserSerializer(many=True)
    
    class Meta:
        model = Travel
        # fields = '__all__'
        exclude = ['register_time','last_modified_time']
        # depth = 1

    # def create(self, validated_data):
    #     head_data = validated_data.pop('head')
    #     travelCommitSerializer = TravelCommitSerializer(data=head_data)
    #     if travelCommitSerializer.is_valid():
    #         head = travelCommitSerializer.save()
    #         travel = Travel.objects.create(head=head,**validated_data)
    #         return travel
    