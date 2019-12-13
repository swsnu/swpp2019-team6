from rest_framework import serializers


from .models import *
from user.serializers import UserSerializer
from .travelembed import TravelEmbed

travelembed = TravelEmbed()

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
    
    def create(self,validated_data):
        blocks_data = validated_data.pop('blocks')
        travelDay = TravelDay.objects.create(**validated_data)

        for i,block_ in enumerate(blocks_data):
            travelBlockSerializer=TravelBlockSerializer(data=block_)
            if travelBlockSerializer.is_valid():
                print('TRAVELBLOCKSERIALIZER VALID')
                block_obj=travelBlockSerializer.save()
                TravelBlockList(TravelDay=travelDay,
                            TravelBlock = block_obj,
                            index=i).save()
            else :
                print('TRAVELBLOCKSERIALIZER INVALID')
                print(travelBlockSerializer.errors)

        return travelDay

class TravelCommitSerializer(serializers.ModelSerializer):

    days = TravelDaySerializer(many=True)
    block_dist = serializers.ListField(
    child=serializers.IntegerField())
    travel_embed_vector = serializers.ListField(
    child=serializers.IntegerField())
    class Meta:
        model = TravelCommit
        exclude = ['register_time']
        write_only_fields = ('block_dist','travel_embed_vector',)

    def validate(self, data):

        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("Start date must be earlier than End date")
        return data
    
    def to_representation(self, obj):
        ret = super().to_representation(obj)
        author= User.objects.get(pk=ret['author'])
        ret['author']=UserSerializer(author).data
        return ret

    def create(self, validated_data):
        
        days_data = validated_data.pop('days')
        travelCommit = TravelCommit.objects.create(**validated_data)

        for i,day_ in enumerate(days_data):
            travelDaySerializer = TravelDaySerializer(data=day_)
            if travelDaySerializer.is_valid():
                print('TRAVELDAYSERIALIZER VALID')
                day_obj =travelDaySerializer.save()
                TravelDayList(TravelCommit=travelCommit,
                            TravelDay=day_obj,
                            index=i).save()
            else:
                print('TRAVELDAYSERIALIZER INVALID')
                print(travelDaySerializer.errors)

        return travelCommit
    
class TravelSerializer(serializers.ModelSerializer):

    head = TravelCommitSerializer()
    class Meta:
        model = Travel
        # fields = '__all__'
        exclude = ['register_time','last_modified_time']
        # depth = 1

    def to_representation(self, obj):
        ret = super().to_representation(obj)
        author = User.objects.get(pk=ret['author'])
        ret['author']=UserSerializer(author).data
        return ret

    def create(self, validated_data):
        global travelembed
        head_data = validated_data.pop('head')
        travelCommit_author=head_data.pop('author')
        head_data['author']=travelCommit_author.id
        a=travelembed.travel_text_embed_vector(head_data['title'])
        head_data['travel_embed_vector']=a
        #head_data['travel_embed_vector']=[1 for i in range(512)]
        
        travelCommitSerializer = TravelCommitSerializer(data=head_data)
        if travelCommitSerializer.is_valid():
            print('TRAVELCOMMIT_SERIALIZER VALID')
            head = travelCommitSerializer.save()
            travel = Travel.objects.create(head=head,**validated_data)
            head.travel=travel
            head.save()
            return travel
        else:
            print('TRAVELCOMMIT_SERIALIZER INVALID')
            print(travelCommitSerializer.errors)
